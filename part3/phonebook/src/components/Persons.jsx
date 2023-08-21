import Person from "./Person"

const Persons = ({ displayPhonebook, remove }) => {
  return (
    <>
    {displayPhonebook.map(person =>
        ( <Person key={person.id} person={person} remove={remove} /> )
      )}
    </>
  )
}

export default Persons