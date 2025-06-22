// app/student-data/[token]/page.tsx
import StudentTable from "@/components/StudentTable";
import { notFound } from "next/navigation";

interface SharePageProps {
  params: {
    token: string;
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = params;

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