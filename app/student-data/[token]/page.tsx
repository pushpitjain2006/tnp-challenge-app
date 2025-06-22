import StudentTable from "@/components/Shared-data/StudentTable";
import { notFound } from "next/navigation";

export default async function SharePage(props: any) {
  const params = await props.params;
  const token = params?.token;
  if (!token) return notFound();

  const res = await fetch(
    `https://tnp-recruitment-challenge.manitvig.live/share?shareToken=${token}`,
    { cache: "no-store" }
  );

  if (res.status !== 200) return notFound();

  const students = await res.json();

  return (
    <div className="p-6 bg-zinc-50 min-h-screen">
      <StudentTable data={students} />
    </div>
  );
}