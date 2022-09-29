import { useMemo, useState } from "react";
import type { FilterValues, Item, TableFilter, UsePaginationProps, UsePaginationReturn, FieldType } from "../type";


function compareValues(a: FieldType, b: FieldType): number {
    if (a < b) return -1;
    if (a > b) return +1;
    return 0;
};

function filterValue<T extends unknown>(value: T, operator: keyof FilterValues, filterValue: string): boolean {
    const operatorsFns = {
        "<": (value: T, filterValue: string) => value < filterValue,
        ">": (value: T, filterValue: string) => value > filterValue,
        "=": (value: T, filterValue: string) => value === filterValue,
        "include": (value: T, filterValue: string) => `${value}`.toLowerCase().includes(filterValue.toLowerCase())
    };
    return operatorsFns[operator](value, filterValue);
}

const useSort = <T extends unknown, F extends keyof T>(
    items: T[],
    columnName: F,
    compareValues: (a: T[F], b: T[F]) => number): T[] => {
    const sortedPosts = useMemo(() => {
        if (columnName) {
            const array: T[] = items;
            return array.sort((a, b) => compareValues(a[columnName], b[columnName]));
        }
        return items;
    }, [columnName, items]);

    return sortedPosts;
}

export function useFilter(items: Array<Item>, filter: TableFilter) {
    const sortedItems = useSort(items, filter.sort, compareValues);
    const sortedAndSearchedPosts = useMemo(() => {
        const { operator, column, value: filterQuery } = filter.filter;
        return operator && column && filterQuery ? sortedItems.filter(value => filterValue(value[column], operator, filterQuery)) : sortedItems;
    }, [sortedItems, filter.filter]);

    return sortedAndSearchedPosts;
}

function usePagination({ count }: UsePaginationProps): UsePaginationReturn {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const pageCount = Math.ceil(count / rowsPerPage);
    const lastContentIndex = page * rowsPerPage;
    const firstContentIndex = lastContentIndex - rowsPerPage;

    function nextPage(page: number): void {
        if (page === pageCount) setPage(page);
        else setPage(page + 1);
    }

    function prevPage(page: number): void {
        if (page === 1) setPage(page);
        else setPage(page - 1);
    }

    function setPageSafe(num: number): void {
        if (num > pageCount) {
            setPage(pageCount);
        } else if (num < 1) {
            setPage(1);
        } else {
            setPage(num);
        }
    }

    return {
        totalPages: pageCount,
        nextPage: () => nextPage(page),
        prevPage: () => prevPage(page),
        setPage: setPageSafe,
        setRowsPerPage,
        rowsPerPage,
        firstContentIndex,
        lastContentIndex,
        page,
    };
}

export default usePagination;