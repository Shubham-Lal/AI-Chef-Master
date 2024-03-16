 const IngredientCard = ({title, image, quantity}) => {
    return (
        <div className="card1  rounded-3xl text-center border-2 border-zinc-900 flex flex-col  items-center px-2 py-1 ">
            <h1 className="text-lg font-bold">Main Ingredients</h1>
            <h3 className='py-2 text-lg font-semibold '>{title}{image}</h3>
            <p>{quantity}</p>
        </div>
      )
}

export default IngredientCard