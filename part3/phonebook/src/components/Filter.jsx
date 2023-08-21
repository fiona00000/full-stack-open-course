const Filter = ({search, handleSearch}) => {
  return (
    <form>
        <div>
          filter shown with <input value={search} onChange={handleSearch} />
        </div>
    </form>
  )
}

export default Filter