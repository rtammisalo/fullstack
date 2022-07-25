const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => (
  <p>{props.part.name} {props.part.exercises}</p>
)

const Content = ({ parts }) => (
  <>
    {parts.map((part) => <Part key={part.id} part={part} />)}
  </>
)

const Total = (props) => {
  var total = props.parts.map(elem => elem.exercises).reduce((x, y) => x + y, 0)

  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'New part',
        exercises: 2,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App