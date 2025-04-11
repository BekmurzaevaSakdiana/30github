import Link from "next/link";
import Card from "./Card";
import Title from "./ui/Title";
import { ProductsUtils } from "@/requests/productsReq";
import { CardData,BaseResponseI } from "@/types/modules";

interface CardsProps {
  text: string;
}

const Cards: React.FC<CardsProps> = async () => {
  let products: BaseResponseI<CardData[]> | null|undefined = null;

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
                price={product.price}
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
