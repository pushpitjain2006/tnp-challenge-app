'use client'

import { useState } from 'react'

export default function ShareableLink() {
  const [link, setLink] = useState('')

  const generateLink = async () => {
    // /api/generate
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
    <div className="mt-6">
      <button
        onClick={generateLink}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded"
      >
        Generate Shareable Link
      </button>

      <div className="mt-6">
        <label className="block font-medium mb-2">Shareable Link</label>
        <div className="flex items-center border rounded p-2 max-w-xl">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 outline-none"
          />
          <button onClick={copyToClipboard} className="ml-2">
            🔗
          </button>
        </div>
      </div>
    </div>
  )
}