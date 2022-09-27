import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { api } from "../http";
import { Column, Item, TableFilter, TableSort } from "../type";
import TableToolbar from "./toolbar";



export default function TableComponent() {

    const columns: Array<Column> = [
        { field: "date", headerName: 'Дата', sortable: false },
        { field: "name", headerName: 'Название', sortable: true },
        { field: "quantity", headerName: 'Количество', sortable: true },
        { field: "distance", headerName: 'Расстояние', sortable: true }
    ]

    const sorts: Array<TableSort> = [
        { value: 'name', name: 'По названию' },
        { value: 'quatity', name: 'По количеству' },
        { value: 'distance', name: 'По расстоянию' },

    ]

    const [data, setData] = useState<Array<Item>>([])
    const [filterData, setFilter] = useState<TableFilter>({ sort: "", filter: { column: "", operator: "", value: "" } })



    useEffect(() => {
        api.get("/items").then((res: AxiosResponse) => { setData(res.data) })
    }, [])

    return <div style={{ height: 400, width: '100%' }}>
        <TableContainer component={Paper}>
            <TableToolbar filter={filterData} setFilter={(data) => setFilter(data)} columns={columns} sorts={sorts} />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map(({ headerName }) => <TableCell key={headerName}>{headerName}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {new Date(row.date).toDateString()}
                            </TableCell>
                            <TableCell >{row.name}</TableCell>
                            <TableCell >{row.quantity}</TableCell>
                            <TableCell >{row.distance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
};