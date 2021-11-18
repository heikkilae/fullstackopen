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
      total of {props.count} exercises
    </p>
  )
}

const Course = ({ course }) => {
  let count = 0

  course.parts.forEach(part => {
    count += part.exercises
  });

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total count={count} />
    </div>
  )
}

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