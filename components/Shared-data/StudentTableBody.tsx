import { MetaDataProps, Student } from "@/types/student";
import {
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function StudentTableBody({
  data,
  sortColumn,
  sortDirection,
  handleSort,
}: MetaDataProps) {
  const SortIcon = (col: keyof Student) => {
    if (sortColumn !== col) return <ChevronsUpDown className="w-4 h-4 opacity-50" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  return (
    <div className="overflow-x-auto rounded border">
      <table className="w-full text-sm border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-zinc-100 text-left">
            {["first_name", "last_name", "email", "roll_no"].map((col) => (
              <th
                key={col}
                onClick={() => handleSort(col as keyof Student)}
                className="px-4 py-3 border cursor-pointer select-none"
              >
                <div className="flex items-center gap-1 capitalize">
                  {col.replace("_", " ")}
                  {SortIcon(col as keyof Student)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="text-center py-6 text-zinc-500 italic"
              >
                No matching students found.
              </td>
            </tr>
          ) : (
            data.map((student, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-zinc-50 transition-colors"
              >
                <td className="px-4 py-2">{student.first_name}</td>
                <td className="px-4 py-2">{student.last_name}</td>
                <td className="px-4 py-2 text-blue-600">
                  <a
                    href={`mailto:${student.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-800"
                  >
                    {student.email}
                  </a>
                </td>
                <td className="px-4 py-2">{student.roll_no}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}