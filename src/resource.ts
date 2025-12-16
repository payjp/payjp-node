/// <reference types="node" />
import type * as I from "./index";

interface Config {
  apikey: string;
  config: I.PayjpOptions;
}

export default class Resource {
  payjp: Config;

  constructor(payjp: Config) {
    this.payjp = payjp;
  }

  get apibase(): string {
    return this.payjp.config.apibase;
  }

  get apikey(): string {
    return this.payjp.apikey;
  }

  private buildHeader(method: string): object {
    const encodedKey = Buffer.from(`${this.payjp.apikey}:`).toString("base64");
    const headers = {
      Accept: "application/json",
      Authorization: `Basic ${encodedKey}`,
    };
    if (method === "POST" || method === "PUT") {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    return headers;
  }

  private getCurrentDelay(retryCount: number, initialDelay: number, maxDelay: number): number {
    const delay = Math.min(initialDelay * 2 ** retryCount, maxDelay);
    return Math.ceil((delay / 2) * (1 + Math.random()));
  }

  protected request<I>(
    method: string,
    endpoint: string,
    query: object = {},
    headers: object = {},
  ): Promise<I> {
    const header: object = Object.assign(this.buildHeader(method), headers);

    const doRequest = async (): Promise<Response> => {
      let url = `${this.payjp.config.apibase}/${endpoint}`;
      const fetchOptions: RequestInit = {
        method,
        headers: header as HeadersInit,
      };

      // Set query parameters or request body
      if (method === "GET" || method === "DELETE") {
        // For GET and DELETE, add query parameters to URL
        const params = new URLSearchParams(query as Record<string, string>);
        const queryString = params.toString();
        if (queryString) {
          url = `${url}?${queryString}`;
        }
      } else {
        // For POST and PUT, send as request body
        const body = new URLSearchParams(query as Record<string, string>);
        fetchOptions.body = body.toString();
      }

      // Set timeout
      if (this.payjp.config.timeout > 0) {
        const controller = new AbortController();
        fetchOptions.signal = controller.signal;
        setTimeout(() => controller.abort(), this.payjp.config.timeout);
      }

      try {
        const response = await fetch(url, fetchOptions);

        // fetch doesn't reject on HTTP error status, so check manually
        if (!response.ok) {
          // Parse and return error response
          const errorBody = await response.json().catch(() => ({}));
          const error = new Error(`HTTP Error ${response.status}`) as any;
          error.status = response.status;
          error.body = errorBody;
          error.message = errorBody.message || `HTTP Error ${response.status}`;
          // Set response.body for compatibility with superagent
          error.response = { body: errorBody, status: response.status };
          throw error;
        }

        return response;
      } catch (error: any) {
        // Convert timeout error message
        if (error.name === "AbortError" || error.name === "TimeoutError") {
          const timeoutError = new Error(
            `Timeout of ${this.payjp.config.timeout}ms exceeded`,
          ) as any;
          timeoutError.name = "TimeoutError";
          timeoutError.code = "ETIMEDOUT";
          timeoutError.timeout = this.payjp.config.timeout;
          throw timeoutError;
        }
        // Convert network error message
        if (error.cause) {
          if (error.cause.code === "ECONNRESET") {
            const networkError = new Error("socket hang up") as any;
            networkError.code = "ECONNRESET";
            throw networkError;
          }
        }
        // Convert 'fetch failed' error to 'socket hang up' (when connection is terminated)
        if (error.message?.includes("fetch failed")) {
          const networkError = new Error("socket hang up") as any;
          networkError.code = "ECONNRESET";
          throw networkError;
        }
        throw error;
      }
    };

    let retryCount = 0;
    const retry = (resolve: (body: any) => void, reject: (reason: any) => void) =>
      doRequest()
        .then(async (res: Response) => {
          // Try to parse as JSON. If it fails, return empty object
          try {
            const body = await res.json();
            resolve(body);
          } catch (_e) {
            // For non-JSON responses (HTML, etc.), return empty object
            resolve({} as any);
          }
        })
        .catch((error: any) => {
          // Retry for 429 (Too Many Requests)
          if (error.status === 429 && retryCount < this.payjp.config.maxRetry) {
            const delayWithJitter = this.getCurrentDelay(
              retryCount,
              this.payjp.config.retryInitialDelay,
              this.payjp.config.retryMaxDelay,
            );
            retryCount++;
            setTimeout(() => retry(resolve, reject), delayWithJitter);
          } else {
            return reject(error);
          }
        });

    return new Promise<I>(retry);
  }
}
