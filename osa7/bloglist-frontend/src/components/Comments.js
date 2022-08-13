import PropType from 'prop-types'
import CommentForm from './CommentForm'

const Comments = ({ blog }) => {
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>Comments</h2>
      <CommentForm blog={blog} />
      <ul>
        {Object.entries(blog.comments).map((e) => (
          <li key={e[0] + e[1]}>{e[1]}</li>
        ))}
      </ul>
    </div>
  )
}

Comments.displayName = 'Comments'

Comments.propTypes = {
  blog: PropType.object,
}

export default Comments
