import Card from "@/components/Card";
import MainTitle from "@/components/ui/MainTitle";
import { ProductsUtils } from "@/requests/productsReq";
import { BaseResponseI,CardData } from "@/types/modules";

const Discounts = async () => {
  let products: BaseResponseI<CardData[]> | null|undefined = null;
  products = await ProductsUtils.getHasDiscountProducts();

  return (
    <section className="contacts-section">
      <MainTitle text="Акции"/>
      
      <div className="container mt-16">
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
            <p className="text-center text-gray-500">Нет товаров со скидками</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Discounts;
