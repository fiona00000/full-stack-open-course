const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => <Part part={parts} />

const Total = ({ sum }) => <p><b>total of exercises {sum}</b></p>


const Course = (props) => {
  return (
    <div>
      {props.courses.map(course => {
        
        const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
        
        return (
          <div key={course.id}>
            <Header course={course.name} />
            {
              course.parts.map(part => (
                <Content key={part.id} parts={part} />
              ))
            }

            <Total sum={total} />
          </div>
        )
      })
      }
    </div>
  )
}

export default Course