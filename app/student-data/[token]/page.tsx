import StudentTable from "@/components/StudentTable";
import { notFound } from "next/navigation";

export default async function SharePage({ params: { token } }: any) {

    if (!token) {
        return notFound();
    }
    console.log("SharePage token:", token);

  const res = await fetch(
    `https://tnp-recruitment-challenge.manitvig.live/share?shareToken=${token}`,
    { cache: "no-store" }
  );


  if (res.status !== 200) {
    return notFound();
  }

  const students = await res.json();

  return (
    <div className="p-6">
      <StudentTable data={students} />
    </div>
  );
}