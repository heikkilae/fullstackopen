import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (   
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      <strong>
        total of {props.count} exercises
      </strong>
    </p>
  )
}

const Course = ({ course }) => {
  const exercises = course.parts.map(part => part.exercises)
  const reducer = (previousValue, currentValue) => previousValue + currentValue
  const total = exercises.reduce(reducer)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total count={total} />
    </div>
  )
}

const App = () => {
// const course = {
//     name: 'Half Stack application development',
//     id: 1,
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10,
//         id: 1
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7,
//         id: 2
//       },
//       {
//         name: 'State of a component',
//         exercises: 14,
//         id: 3
//       }
//     ]
//   }
const courses = [
  {
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
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

  return (
    <div>
      {/* <Course course={course} /> */}
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App