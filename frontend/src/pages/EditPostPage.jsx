import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

// COMPLETED: Implement edit flow.
// 1) Fetch existing post with GET /api/posts/:id.
// 2) Pass fetched data to PostForm as initialData.
// 3) On submit, send PUT /api/posts/:id.
// 4) Navigate back to /posts/:id after successful save.
function EditPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // COMPLETED: Replace this placeholder with GET /api/posts/:id fetch logic.
    let ignore = false

    async function loadPost() {
      setLoading(true)
      setError(null)
      setPost(null)

      try {
        const response = await fetch(`/api/posts/${id}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to load post')
        }

        if (!ignore) {
          setPost(result)
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadPost()

    return () => {
      ignore = true
    }
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    // COMPLETED: Implement PUT /api/posts/:id.
    try {
      const formData = new FormData(e.currentTarget)
      const post = {
        title: (formData.get('title') || '').trim(),
        author: (formData.get('author') || '').trim(),
        content: (formData.get('content') || '').trim(),
      }

      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update post')
      }

      navigate(`/posts/${id}`)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="status-msg">Loading…</p>
  if (error && !post) return <p className="status-msg error">{error}</p>
  if (!post) return <p className="status-msg">TODO: Load a post before editing.</p>

  return (
    <div>
      <h1 className="page-title">Edit post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm
        key={post._id}
        initialData={post}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  )
}

export default EditPostPage
