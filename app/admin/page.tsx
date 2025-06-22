import ShareableLink from '@/components/ShareableLink'
import Navbar from '@/components/Navbar'

export default function AdminPanel() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 w-full max-w-3xl mx-auto mt-8 px-4 sm:mt-12">
        <h1 className="text-2xl sm:text-4xl font-bold">Admin Panel</h1>
        <p className="text-gray-500 mt-2 text-base sm:text-lg">
          Manage student data and generate shareable links.
        </p>
        <ShareableLink />
      </section>
    </div>
  )
}