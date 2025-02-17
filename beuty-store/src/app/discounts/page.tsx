import Card from "@/components/Card";
import MainTitle from "@/components/ui/MainTitle";
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

const Discounts = async () => {
  let products: BaseResponseI<CardData[]> | null = null;
  products = await ProductsUtils.getHasDiscountProducts();

  return (
    <section className="contacts-section">
      <MainTitle text="Акции"/>
      
      <div className="container mt-16">
        <div className="cards-items">
          <div className="cards-items">
            {products?.results?.map((products) => (
              <div className="cardWords w-full ss" key={products.id}>
                <Card
                  id={products.id}
                  images={products.images}
                  title={products.name}
                  subtitle={products.subtitle}
                  description={products.description}
                  price={products.price}
                  discount={products.discount_price}
                ></Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discounts;
