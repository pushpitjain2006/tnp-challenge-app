'use client'

import { useState } from 'react'

export default function ShareableLink() {
  const [link, setLink] = useState('')

  const generateLink = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 401) {
      alert('Unauthorized. Please log in again.')
      window.location.href = '/login'
      return
    }
    if (res.status !== 200) {
      alert('Failed to generate link. Please try again later.')
      return
    }
    const data = await res.json()
    const shareToken = data.shareToken
    if (!shareToken) {
      alert('Failed to generate link. Invalid response from server.')
      return
    }
    const baseUrl = window.location.origin
    const shareLink = `${baseUrl}/student-data/${encodeURIComponent(shareToken)}`;
    setLink(shareLink)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
  }

  return (
    <div className="mt-6 px-2 sm:px-4">
      <button
        onClick={generateLink}
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded"
      >
        Generate Shareable Link
      </button>

      <div className="mt-6">
        <label className="block font-medium mb-2">Shareable Link</label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center border rounded p-2 max-w-full sm:max-w-xl">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 outline-none mb-2 sm:mb-0"
          />
          <button
            onClick={copyToClipboard}
            className="sm:ml-2 bg-gray-100 hover:bg-gray-200 rounded px-3 py-1"
          >
            🔗
          </button>
        </div>
      </div>
    </div>
  )
}