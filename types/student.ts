export interface Student {
  first_name: string;
  last_name: string;
  email: string;
  roll_no: string;
}

export interface MetaDataProps {
    data: Student[];
    sortColumn: keyof Student | null;
    sortDirection: "asc" | "desc";
    handleSort: (col: keyof Student) => void;
}