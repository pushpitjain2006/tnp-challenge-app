// components/StudentTableHeader.tsx
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  exportAsExcel: () => void;
  exportAsJSON: () => void;
}

export default function StudentTableHeader({
  search,
  setSearch,
  exportAsExcel,
  exportAsJSON,
}: Props) {
  return (
    <div className="flex justify-between mb-4">
      <Input
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={exportAsExcel}>Export Excel</DropdownMenuItem>
          <DropdownMenuItem onClick={exportAsJSON}>Export JSON</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}