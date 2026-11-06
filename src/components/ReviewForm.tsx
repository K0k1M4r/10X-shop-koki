import { useState } from 'react'
import type { FormEvent } from 'react'

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void
}

interface ReviewErrors {
  rating?: string
  comment?: string
}

function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState<ReviewErrors>({})

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: ReviewErrors = {}
    if (!rating) next.rating = 'Please select a rating'
    if (comment.trim().length < 10) {
      next.comment = 'Comment must be at least 10 characters'
    }
    setErrors(next)
    if (Object.keys(next).length > 0) return

    onSubmit(Number(rating), comment.trim())
    setRating('')
    setComment('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-4 space-y-3 rounded border border-gray-200 p-3"
    >
      <h3 className="font-semibold">Write a review</h3>
      <div>
        <label htmlFor="review-rating" className="block text-sm font-medium">
          Rating
        </label>
        <select
          id="review-rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="mt-1 rounded border border-gray-300 bg-white p-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Select rating</option>
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={String(value)}>
              {value} ★
            </option>
          ))}
        </select>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
        )}
      </div>
      <div>
        <label htmlFor="review-comment" className="block text-sm font-medium">
          Comment
        </label>
        <textarea
          id="review-comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
        )}
      </div>
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300"
      >
        Submit review
      </button>
    </form>
  )
}

export default ReviewForm