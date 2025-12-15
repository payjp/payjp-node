/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Payjp from "../../built";

// Payjp.PayjpStatic
const apikey = "sk_test_xxx";
const payjp = Payjp(apikey);

async function _main(): Promise<void> {
  // Charge
  const chargeParams: Payjp.ChargeCreationOptions = {
    amount: 1000,
    currency: "jpy",
    card: "token_id_by_Checkout_or_payjp.js",
  };
  try {
    const charge: Payjp.Charge = await payjp.charges.create(chargeParams);
    let _amount = 1000;
    _amount = charge.amount;
    let _amount_refunded = 1000;
    _amount_refunded = charge.amount_refunded;
    // and more...
  } catch (e) {
    // Error
    const responseError = e as Payjp.ResponseError;
    let _status: number = responseError.status;
    const payjpError: Payjp.PayjpError = responseError.response.body;
    const _code: string = payjpError.error.code;
    const _message: string = payjpError.error.message;
    const _param: string = payjpError.error.param;
    _status = payjpError.error.status;
  }

  // Transfer
  try {
    const transferId = "tr_xxx";
    const transfer: Payjp.Transfer = await payjp.transfers.retrieve(transferId);
    let _transferDate = "2020-03-21";
    _transferDate = transfer.transfer_date;
    // and more...
  } catch (_e) {}
}
