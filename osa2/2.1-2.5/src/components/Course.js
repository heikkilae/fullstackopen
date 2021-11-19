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

  export default Course