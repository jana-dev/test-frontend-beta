import Products from "./components/products"
import PaginationProducts from "./components/pagination"
import SearchBar from "./components/ui/searchBar"

const getData = async () => {
  const res = await fetch("https://dummyjson.com/products")

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  //API data products
  const productsResponse = await getData()

  //pagination


  return (
    <main>
      <SearchBar />
      <Products productsResponse={productsResponse} />
      <PaginationProducts />

    </main>
  )
}
