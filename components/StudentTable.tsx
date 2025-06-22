"use client";
import { useState } from "react";

interface Student {
  first_name: string;
  last_name: string;
  email: string;
  roll_no: string;
}

export default function StudentTable({ data }: { data: Student[] }) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((student) =>
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Student Data</h1>

      <input
        type="text"
        placeholder="🔍 Search by email"
        className="w-full p-3 border rounded-lg mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">First Name</th>
            <th className="p-3 border">Last Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Roll No</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((student, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-3">{student.first_name}</td>
              <td className="p-3">{student.last_name}</td>
              <td className="p-3 text-blue-600">{student.email}</td>
              <td className="p-3">{student.roll_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}