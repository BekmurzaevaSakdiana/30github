import Link from "next/link";
import Card from "./Card";
import Title from "./ui/Title";
import { ProductsUtils } from "@/requests/productsReq";
import { CardData, BaseResponseI } from "@/types/modules";
import Pagination from "./Pagination";

interface CardsProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Cards: React.FC<CardsProps> = async ({ searchParams }) => {
  console.log(searchParams);

  const page = Number(
    typeof searchParams?.page === "string" ? searchParams.page : "1"
  );

  const limit = 3; 
  const offset = (page - 1) * limit;
  let products: BaseResponseI<CardData[]> | null | undefined = null;
  products = await ProductsUtils.getIsNewPoducts(limit, offset);
  const showPagination = products?.count && products.count >= limit;

  console.log(products);
  return (
    <div className="title__cards">
      <div className="container">
        {products?.results?.length ? (
          <>
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

            {showPagination && (
              <Pagination
                next={products?.next}
                back={products?.previous}
                limit={limit}
              />
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            Новинок пока нет
          </p>
        )}
      </div>
    </div>
  );
};

export default Cards;
