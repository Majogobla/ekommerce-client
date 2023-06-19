export const Categories = ({categories}) => {
    
  return (
    <>
      <ul className="flex flex-col gap-2">
        {categories.map((categories) => (
          <li key={categories.id}>
            <a href="" className="hover:text-red-500 hover:font-bold">
            {categories.name}
            </a>
            </li>
        ))}
      </ul>
    </>
  )
}
