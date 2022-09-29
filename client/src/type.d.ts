
export type Item = {
    id: number;
    date: Date;
    name: string;
    quantity: number;
    distance: number
}

export type TableColumn = {
    field: keyof Item,
    headerName: string,
    sortable: boolean
}

type FilterValues = {
    "<": string,
    ">": string,
    "=": string,
    "include": string
}

type Filter = {
    column: keyof Item,
    operator: keyof FilterValues,
    value: string
}

export type TableFilter = {
    sort: keyof Item,
    filter: Filter
}

export type TableSort = {
    value: keyof Item,
    name: string
}

export type FilterOperatos = {
    value: keyof FilterValues,
    name: string
}


type UsePaginationProps = {
    count: number,
}

type UsePaginationReturn = {
    page: number,
    totalPages: number,
    firstContentIndex: number,
    lastContentIndex: number,
    rowsPerPage: number,
    nextPage: () => void,
    prevPage: () => void,
    setPage: (page: number) => void,
    setRowsPerPage: (rowsPerPage: number) => void
}

export type FieldType = number | string | Date;

