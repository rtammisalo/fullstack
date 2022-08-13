import PropType from 'prop-types'

const Comments = ({ comments }) => {
  if (!comments) {
    comments = []
  }

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {Object.entries(comments).map((e) => (
          <li key={e[0] + e[1]}>{e[1]}</li>
        ))}
      </ul>
    </div>
  )
}

Comments.displayName = 'Comments'

Comments.propTypes = {
  comments: PropType.array,
}

export default Comments
