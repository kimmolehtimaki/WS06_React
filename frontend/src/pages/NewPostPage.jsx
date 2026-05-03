import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

// COMPLETED: Implement create flow (POST /api/posts).
// 1) Read form values in handleSubmit.
// 2) POST JSON body to /api/posts.
// 3) On success, navigate to /posts/:id.
// 4) Show an error message on failure.
function NewPostPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    // COMPLETED: Implement submit logic
    try {
      const formData = new FormData(e.currentTarget)
      const post = {
        title: (formData.get('title') || '').trim(),
        author: (formData.get('author') || '').trim(),
        content: (formData.get('content') || '').trim(),
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create post')
      }

      navigate(`/posts/${result._id}`)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="page-title">New post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  )
}

export default NewPostPage
