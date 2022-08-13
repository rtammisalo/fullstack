import PropType from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const saveComment = (event) => {
    event.preventDefault()
    dispatch(addComment(user, blog, comment))
    setComment('')
  }

  return (
    <div>
      <form onSubmit={saveComment}>
        <input
          type='text'
          name='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <button>add comment</button>
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  blog: PropType.object,
}

export default CommentForm
