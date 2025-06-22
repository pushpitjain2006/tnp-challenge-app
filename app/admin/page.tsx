import Navbar from "@/components/Admin-side/Navbar";
import ShareableLink from "@/components/Admin-side/ShareableLink";

export default function AdminPanel() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <section className="flex-1 w-full max-w-3xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold text-zinc-800">Admin Panel</h1>
        <ShareableLink />
      </section>
    </div>
  );
}