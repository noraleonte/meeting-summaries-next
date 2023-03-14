export type Account = { hubspot_id: number | string; name: string }

type Meeting = {
  id: string
  name: string
  time: string
  account: Account
  steps: string[]
}

export default Meeting
