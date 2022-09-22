/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Payjp from '../../built'

// Payjp.PayjpStatic
const apikey = 'sk_test_xxx'
const payjp = Payjp(apikey)

async function main(): Promise<void> {
  // Charge
  const chargeParams: Payjp.ChargeCreationOptions = {
    amount: 1000,
    currency: 'jpy',
    card: 'token_id_by_Checkout_or_payjp.js',
  }
  try {
    const charge: Payjp.Charge = await payjp.charges.create(chargeParams)
    let amount = 1000
    amount = charge.amount
    let amount_refunded = 1000
    amount_refunded = charge.amount_refunded
    // and more...
  } catch (e) {
    // Error
    const responseError = e as Payjp.ResponseError
    let status: number = responseError.status
    const payjpError: Payjp.PayjpError = responseError.response.body
    const code: string = payjpError.error.code
    const message: string = payjpError.error.message
    const param: string = payjpError.error.param
    status = payjpError.error.status
  }

  // Transfer
  try {
    const transferId = 'tr_xxx'
    const transfer: Payjp.Transfer = await payjp.transfers.retrieve(transferId)
    let transferDate = '2020-03-21'
    transferDate = transfer.transfer_date
    // and more...
  } catch (e) { }
}
