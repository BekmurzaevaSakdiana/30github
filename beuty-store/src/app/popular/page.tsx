import Card from "@/components/Card";
import MainTitle from "@/components/ui/MainTitle";
import  {ProductsUtils}  from "@/requests/productsReq";

export interface CardData {
  id: number;
  images: { image: string }[];
  name: string;
  subtitle: string;
  description: string;
  price: number;
  discount_price?: string;
}

export interface BaseResponseI<T> {
  count: number;
  next: null | string;
  previous: null | string;
  results: T;
}

const Popular = async () => {
    let products: BaseResponseI<CardData[]> | null = null;
    products = await ProductsUtils.getIsPopularProducts();

  return (
    <section className="contacts-section">
      <MainTitle text="Популярное"/>

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
              <p className="text-center text-gray-500">Нет популярных товаров</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
