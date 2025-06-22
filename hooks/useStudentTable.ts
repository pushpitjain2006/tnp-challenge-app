import { useState, useMemo } from "react";
import { Student } from "@/types/student";
import * as XLSX from "xlsx";

export function useStudentTable(data: Student[]) {
    const [search, setSearch] = useState("");
    const [sortColumn, setSortColumn] = useState<keyof Student | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredData = useMemo(() => {
        return data.filter((student) =>
            student.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, data]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            if (!sortColumn) return 0;
            const valA = a[sortColumn]?.toString().toLowerCase();
            const valB = b[sortColumn]?.toString().toLowerCase();
            return valA.localeCompare(valB) * (sortDirection === "asc" ? 1 : -1);
        });
    }, [filteredData, sortColumn, sortDirection]);

    const handleSort = (column: keyof Student) => {
        if (sortColumn === column && sortDirection === "asc") {
            setSortDirection("desc");
        } else if (sortColumn === column && sortDirection === "desc") {
            setSortColumn(null);
            setSortDirection("asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const exportAsExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
        XLSX.writeFile(workbook, "students.xlsx");
    };

    const exportAsJSON = () => {
        const json = JSON.stringify(filteredData, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "students.json";
        link.click();
    };

    return {
        search,
        setSearch,
        sortColumn,
        sortDirection,
        handleSort,
        sortedData,
        exportAsExcel,
        exportAsJSON,
    };
}