import React, { useEffect, useState } from 'react'
import { apiFetchJson } from '../utils/api.js'

const Careers = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const data = await apiFetchJson('/api/jobs')
        if (cancelled) return
        setJobs(Array.isArray(data) ? data : [])
      } catch (err) {
        if (cancelled) return
        setError(err && err.message ? String(err.message) : 'Failed to load jobs')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Careers / Vacancies</h1>
      <p className="mb-6 text-gray-700">Explore current job opportunities at Mthunzi Trust. Click a job to view details and how to apply.</p>

      {loading ? (
        <div>Loading…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : jobs.length === 0 ? (
        <div className="p-6 border rounded text-gray-600">No vacancies at the moment. Check back later.</div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => {
            const id = job._id || job.id
            return (
              <article key={id} className="p-4 border rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <div className="text-sm text-gray-600">{job.location || 'Location not specified'} — {job.type || 'Type not specified'}</div>
                  </div>
                  <div className="text-sm text-gray-500">{job.deadline ? new Date(job.deadline).toLocaleDateString() : ''}</div>
                </div>
                <div className="mt-3 text-gray-700">{job.description ? (job.description.length > 400 ? job.description.slice(0, 400) + '…' : job.description) : ''}</div>
                <div className="mt-3">
                  {job.applyUrl ? (
                    <a href={job.applyUrl} target="_blank" rel="noreferrer" className="text-green-600 hover:underline">Apply online</a>
                  ) : job.applyEmail ? (
                    <a href={`mailto:${job.applyEmail}`} className="text-green-600 hover:underline">Apply via email</a>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default Careers
