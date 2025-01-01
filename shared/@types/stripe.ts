export interface PaymentData {
  id: string
  amount: Amount
  status: string
  description: string
  recipient: Recipient
  create_at: string
  confirmation: Confirmation
  test: boolean
  paid: boolean
  refundable: boolean
  metadata: Metadata
}

export interface Amount {
  value: string
  currency: string
}

export interface Metadata {
  order_id: string
}

export interface Recipient {
  account_id: string
  gateway_id: string
}

export interface Confirmation {
  type: string
  confirmation_url: string
}

export type PaymentCallbckData = {
  type: string
  event: string
  object: {
    id: string
    status: string
    amount: {
      value: string
      currency: 'usd'
    }
    income_amount: {
      value: string
      currency: 'usd'
    }
    description: string
    recipient: {
      account_id: string
      gateway_id: string
    }
    payment_method: {
      type: string
      id: string
      saved: boolean
      title: string
    }
    metadata: {
      order_id: string
    }
    create_at: string
    captured_at: string
    test: boolean
    refunded_amount: {
      value: string
      currency: 'usd'
    }
    refundable: true
    authorization_details: {
      rrn: string
      auth_code: string
    }
  }
}
