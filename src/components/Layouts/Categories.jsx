export const Categories = ({categories}) => {
    
  return (
    <>
      <ul className="flex flex-col gap-2">
        {categories.map((categories) => (
          <li key={categories.id}>{categories.name}</li>
        ))}
      </ul>
    </>
  )
}
