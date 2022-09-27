
export type Item = {
    id: number;
    date: Date;
    name: string;
    quantity: number;
    distance: number
}

export type Column = {
    field: string,
    headerName: string,
    sortable: boolean
}

type Filter = {
    column: string,
    operator: string,
    value: string
}

export type TableFilter = {
    sort: string,
    filter: Filter
}

export type TableSort = {
    value: string,
    name: string
}