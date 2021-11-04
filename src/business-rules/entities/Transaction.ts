export type Transaction = {
    readonly id: string
    categoryId: string
    cashAccountId: string
    money: number,
    dateTimestamp: number,
    comment?: string,
}