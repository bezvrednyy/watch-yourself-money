import type {CurrencyType} from '../CurrencyType'

export type CashAccount = {
    readonly id: string
    name: string
    iconUrl: string
    color: string
    money: number
    accountedByStats: boolean
    currency: CurrencyType
    description?: string
}