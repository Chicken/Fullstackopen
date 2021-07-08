import React from "react"

const CourseHeader = ({ course }) => <h2>{course}</h2>

const Part = ({ part: { name, exercises } }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => (
  <>
    { parts.map(part => <Part part={part}/>) }
  </>
)

const Total = ({ parts }) => <b>Total of {parts.reduce((a, c) => a + c.exercises, 0)} exercises</b>

const Course = ({ course }) => (
  <div>
    <CourseHeader course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course
