import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import MainTitle from "@/components/ui/MainTitle";
import { ProductsUtils } from "@/requests/productsReq";
import { BaseResponseI, CardData } from "@/types/modules";

interface PopularProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Popular = async ({ searchParams }: PopularProps) => {
  const page = Number(
    typeof searchParams?.page === "string" ? searchParams.page : "1"
  );

  const limit = 4;
  const offset = (page - 1) * limit;

  let products: BaseResponseI<CardData[]> | null | undefined = null;
  products = await ProductsUtils.getIsPopularProducts(limit, offset);

  const showPagination = products?.count && products.count >= limit;

  return (
    <section className="contacts-section">
      <MainTitle text="Популярное" />

      <div className="container">
        <div className="popular-items mt-16">
          <div className="cards-items">
            {products?.results?.length ? (
              products.results.map((product) => (
                <div className="cardWords w-full" key={product.id}>
                  <Card
                    id={product.id}
                    images={product.images}
                    title={product.name}
                    subtitle={product.subtitle}
                    description={product.description}
                    price={product.price}
                    discount={product.discount_price}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Нет популярных товаров
              </p>
            )}
          </div>
        </div>
        {showPagination && (
          <Pagination
            next={products?.next}
            back={products?.previous}
            limit={limit}
          />
        )}
      </div>
    </section>
  );
};

export default Popular;
