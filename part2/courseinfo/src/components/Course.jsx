import Content from './Content';
import Header from './Header'
import Total from './Total'

const Course = (props) => {
  const total = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
      <div>
          <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total sum={total} />
    </div>
  )
}

export default Course