import { Box, FormGroup, MenuItem, Select, TextField, Typography, Stack } from "@mui/material";
import type { TableColumn, Item, TableFilter, TableSort, FilterOperatos, FilterValues } from "../../type";

interface TableToolbarProps {
    filter: TableFilter
    setFilter: (data: TableFilter) => void,
    columns: Array<TableColumn>,
    sorts: Array<TableSort>
}

const operators: Array<FilterOperatos> = [{
    name: "Ровно",
    value: "="
}, {
    name: "Содержит",
    value: "include"
}, {
    name: "Больше",
    value: ">"
}, {
    name: "Меньше",
    value: "<"
}];

function TableToolbar({ filter, setFilter, columns, sorts }: TableToolbarProps) {

    return (
        <FormGroup>
            <Stack direction="row" spacing={3} mb={3} p={1}>
                <Box>
                    <Typography mb={1}>Фильтрация</Typography>
                    <Stack direction="row" spacing={1.5}>
                        <Select
                            value={filter.filter.column}
                            onChange={e => setFilter({ ...filter, filter: { ...filter.filter, column: e.target.value as keyof Item } })}
                            defaultValue="Колонка"
                        >
                            {columns.map(({ headerName, field }) => <MenuItem key={field} value={field}>{headerName}</MenuItem>)}
                        </Select>
                        <Select
                            value={filter.filter.operator}
                            onChange={e => setFilter({ ...filter, filter: { ...filter.filter, operator: e.target.value as keyof FilterValues } })}
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
                </Box>
                <Box>
                    <Typography mb={1}>Сортировка</Typography>
                    <Stack direction="row" spacing={1}>
                        <Select
                            value={filter.sort}
                            onChange={e => setFilter({ ...filter, sort: e.target.value as keyof Item })}
                            defaultValue="Сортировка"
                        >
                            {sorts.map(({ name, value }) => <MenuItem key={value} value={value}>{name}</MenuItem>)}
                        </Select>
                    </Stack>
                </Box>
            </Stack>
        </FormGroup>
    );
}
export default TableToolbar;