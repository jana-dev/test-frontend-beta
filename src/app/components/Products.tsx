'use client';
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
    _id: number;
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

const Products = ({ productsResponse  }: Props) => {
    console.log(productsResponse.products)
    return (
        <div>
            {
                productsResponse.products.map((item) => (
                    <Link href={"/"} key={item._id}>
                        <div>
                            <Image src={item?.images[0]} width={500} height={500} alt="Test"/>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Products