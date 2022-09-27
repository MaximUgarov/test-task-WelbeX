import { FormGroup, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { Column, TableFilter, TableSort } from "../type";

interface TableToolbarProps {
    filter: TableFilter
    setFilter: (data: TableFilter) => void,
    columns: Array<Column>,
    sorts: Array<TableSort>
}

const operators = [{
    name: "ровно",
    value: "="
}, {
    name: "содержит",
    value: "include"
}, {
    name: "больше",
    value: ">"
}, {
    name: "меньше",
    value: "<"
}]

function TableToolbar({ filter, setFilter, columns, sorts }: TableToolbarProps) {
    console.log(filter.filter.value)
    return (
        <FormGroup>
            <Stack direction="row">
                <Select
                    value={filter.filter.column}
                    onChange={e => setFilter({ ...filter, filter: { ...filter.filter, column: e.target.value } })}
                    defaultValue="Колонка"
                >
                    {columns.map(({ headerName, field }) => <MenuItem key={field} value={field}>{headerName}</MenuItem>)}
                </Select>
                <Select
                    value={filter.filter.operator}
                    onChange={e => setFilter({ ...filter, filter: { ...filter.filter, operator: e.target.value } })}
                    defaultValue="Оператор"
                >
                    {operators.map(({ name, value }) => <MenuItem key={value} value={value}>{name}</MenuItem>)}
                </Select>
                <TextField
                    value={filter.filter.value}
                    onChange={e => setFilter({ ...filter, filter: { ...filter.filter, value: e.target.value } })}
                    label="Значение"
                />
            </Stack>
            <Select
                value={filter.sort}
                onChange={e => setFilter({ ...filter, sort: e.target.value })}
                defaultValue="Сортировка"
            >
                {sorts.map(({ name, value }) => <MenuItem key={value} value={value}>{name}</MenuItem>)}
            </Select>
        </FormGroup>
    );
}
export default TableToolbar;