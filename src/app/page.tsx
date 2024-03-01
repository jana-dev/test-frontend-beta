import Products from "./components/Products"

const getData = async() => {
  const res = await fetch("https://dummyjson.com/products")

  if(!res.ok){
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const productsResponse = await getData()
  
  return (
    <main>
      <Products productsResponse={productsResponse}/>
    </main>
  )
}
