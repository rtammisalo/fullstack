const Header = ({ courseName }) => <h2>{courseName}</h2>

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
  <>
    {parts.map((part) => <Part key={part.id} part={part} />)}
  </>
)

const Total = ({ parts }) => (
  <p>
    <b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
  </p>
)

const Course = ({ course }) => (
  <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course