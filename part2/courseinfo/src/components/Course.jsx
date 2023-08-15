import Content from './Content';
import Header from './Header'
import Total from './Total'

const Course = (props) => {
  return (
      <div>
          <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total sum={props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} />
    </div>
  )
}

export default Course