'use client';
import Link from "next/link";
import Image from "next/image";
import DropdownButton from "./ui/dropdownButton";
import HalfRating from "./ui/ratingProduct";

interface ProductProps {
    id: number;
    title: string;
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    images: Array<string>;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
}

interface ProductsResponse {
    products: ProductProps[];
    total: number;
    skip: number;
    limit: number;
}

interface Props {
    productsResponse: ProductsResponse; // Mudança na propriedade para refletir o formato de dados
}

const Products = ({ productsResponse }: Props) => {
    console.log(productsResponse.products)
    return (
        <>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10 text-center">
                {
                    productsResponse.products.map((item) => (
                        <Link href={"/"} key={item.id}>
                            <div className="flex flex-col justify-start  h-[420px]  border-[1px] border-gray-500 relative p-6">
                                {/*Product image*/}
                                <Image
                                    src={item?.thumbnail}
                                    width={500}
                                    height={500}
                                    alt="Test"
                                    className="w-full h-40 object-fill"
                                />
                                <DropdownButton />
                                {/*Product content*/}
                                <div className="px-4 text-sm flex flex-col gap-1 text-left">
                                    <p>{item?.title}</p>
                                    <p>{item?.brand}</p>
                                    <p>{item?.category}</p>
                                    <p className="overflow-hidden h-12 border-black border-[1px]">
                                        {item?.description}
                                    </p>
                                    <p>{item?.discountPercentage}%</p>
                                    <p>R$ {item?.price}</p>
                                    <HalfRating rating={item?.rating} />
                                    <p>{item?.stock}</p>

                                </div>
                            </div>

                        </Link>
                    ))
                }
            </div>
        </>

    )
}

export default Products