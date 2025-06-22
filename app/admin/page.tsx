import ShareableLink from '@/components/ShareableLink'
import Navbar from '@/components/Navbar'

export default function AdminPanel() {
  return (
    <div>
        <Navbar />
    <section className="max-w-3xl mx-auto mt-12">
      <h1 className="text-4xl font-bold">Admin Panel</h1>
      <p className="text-gray-500 mt-2">Manage student data and generate shareable links.</p>
      <ShareableLink />
    </section>
    </div>
  )
}