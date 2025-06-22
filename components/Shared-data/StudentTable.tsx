// components/StudentTable.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StudentTableHeader from "@/components/Shared-data/StudentTableHeader";
import StudentTableBody from "@/components/Shared-data/StudentTableBody";
import { useStudentTable } from "@/hooks/useStudentTable";
import { Student } from "@/types/student";

export default function StudentTable({ data }: { data: Student[] }) {
  const {
    search,
    setSearch,
    sortedData,
    sortColumn,
    sortDirection,
    handleSort,
    exportAsExcel,
    exportAsJSON,
  } = useStudentTable(data);

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Student Data</CardTitle>
      </CardHeader>
      <CardContent>
        <StudentTableHeader
          search={search}
          setSearch={setSearch}
          exportAsExcel={exportAsExcel}
          exportAsJSON={exportAsJSON}
        />
        <StudentTableBody
          data={sortedData}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          handleSort={handleSort}
        />
      </CardContent>
    </Card>
  );
}