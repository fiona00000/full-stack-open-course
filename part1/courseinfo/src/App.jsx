const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0]} exercise={props.exercise[0]} />
      <Part part={props.part[1]} exercise={props.exercise[1]} />
      <Part part={props.part[2]} exercise={props.exercise[2]} />
    </div>
  )
}
const Total = (props) => {
  return (
    <p>Number of exercises {props.exercise}</p>    
  )
}

const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const part = ['Fundamentals of React','Using props to pass data','State of a component']
  const exercises = [10,7,14]
  return (
    <div>
      <Header course={course} />
      <Content part={part} exercise={exercises}/>      
      <Total exercise={exercises[0] + exercises[1] + exercises[2]} />
    </div>
  )
}

export default App