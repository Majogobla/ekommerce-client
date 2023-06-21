function Alert({children}) 
{
  return (
    <p className="text-center bg-red-600 text-white text-sm font-bold p-3 uppercase rounded-lg">
      {children}
    </p>
  )
}

export default Alert