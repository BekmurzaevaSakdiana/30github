import Link from "next/link";
import Card from "./Card";
import Title from "./ui/Title";
import { ProductsUtils } from "@/requests/productsReq";

export interface CardData {
  id: number;
  images: { image: string }[];
  name: string;
  subtitle: string;
  description: string;
  price: number;
  discount_price?:string;

}

export interface BaseResponseI<T> {
  count: number;
  next: null | string;
  previous: null | string;
  results: T;
}

interface CardsProps {
  text: string;
}

const Cards: React.FC<CardsProps> = async ({ text }) => {
  let products: BaseResponseI<CardData[]> | null = null;

  products = await ProductsUtils.getIsNewPoducts();

  console.log(products);
  return (
    <div className="title__cards">
      <div className="container">
        <div className="title max-xl:px-1">
          <Title text="Новинки" />
        </div>

        <div className="cards-items">
          {products?.results?.map((product) => (
            <div className="cardWords w-full ss" key={product.id}>
              <Card
                id={product.id}
                images={product.images}
                title={product.name}
                subtitle={product.subtitle}
                description={product.description}
                discount={product.discount_price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
