import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import usePagination, { useFilter } from "../../hooks";
import { api } from "../../http";
import TableToolbar from "./toolbar";
import type { TableColumn, Item, TableFilter, TableSort } from "../../type";

const columns: Array<TableColumn> = [
    { field: "date", headerName: "Дата", sortable: false },
    { field: "name", headerName: "Название", sortable: true },
    { field: "quantity", headerName: "Количество", sortable: true },
    { field: "distance", headerName: "Расстояние", sortable: true }
];

const sorts: Array<TableSort> = [
    { value: "name", name: "По названию" },
    { value: "quantity", name: "По количеству" },
    { value: "distance", name: "По расстоянию" },

];

export default function TableComponent() {


    const [data, setData] = useState<Array<Item>>([]);
    const [filterData, setFilter] = useState<TableFilter>({ sort: "name", filter: { column: "date", operator: ">", value: "" } });

    const dataFiltred = useFilter(data, filterData);
    const { firstContentIndex,
        lastContentIndex,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage
    } = usePagination({
        count: dataFiltred.length,
    });

    useEffect(() => {
        api.get("/items").then((res: AxiosResponse) => { setData(res.data); });
    }, []);

    function handleChangePage(
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ): void {
        setPage(newPage + 1);
    }

    function handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }



    return <div style={{ height: 400, width: "100%" }}>
        <TableContainer component={Paper}>
            <TableToolbar filter={filterData} setFilter={data => setFilter(data)} columns={columns} sorts={sorts} />
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        {columns.map(({ headerName }) => <TableCell key={headerName}>{headerName}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataFiltred.slice(firstContentIndex, lastContentIndex).map(row => (
                        <TableRow
                            key={row.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
            <TablePagination
                component="div"
                count={dataFiltred.length}
                page={page - 1}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    </div>;
}