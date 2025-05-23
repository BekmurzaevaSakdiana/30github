import GoBack from "@/components/goBack";
import { ProductsUtils } from "@/requests/productsReq";
import ProductSlider from "@/components/ProductSlider";
import MainTitle from "@/components/ui/MainTitle";
import { CardData, BaseResponseI } from "@/types/modules";
import ProductBtn from "@/components/ProductBtn";

interface ProductPageProps {
  params: {
    id: number;
  };
}

const PageProduct = async ({ params }: ProductPageProps) => {
  let products: CardData | null | undefined = null;
  products = await ProductsUtils.getByIdProduct(params.id);

  return (
    <section className="contacts-section ">
      <MainTitle text={products?.name || "adasd"} />

      <div className="container mt-8 lg:mt-16">
        <div className="mb-8 lg:mb-12">
          <GoBack />
        </div>

        {products && (
          <div className="cartItem shadow-lg rounded-lg p-4 flex flex-col lg:flex-row items-center w-full lg:w-[90%] justify-between mx-auto mb-6 gap-6">
            <ProductSlider
              images={products?.images}
              title={products?.subtitle}
            />
            <div className="productName__price flex flex-col gap-4 w-full lg:w-1/2">
              <h2 className="text-lg lg:text-xl">
                Название:{" "}
                <span className="font-medium text-buttonPink">
                  {products.name}
                </span>
              </h2>
              <p className="text-lg lg:text-xl">
                Цена:{" "}
                <span className="font-bold text-buttonPink">
                  {products.price}
                </span>
              </p>

              <p className="text-lg lg:text-xl">
                Артикул:{" "}
                <span className="font-bold text-buttonPink">
                  {products.article}
                </span>
              </p>
              <div className="couter-cart flex flex-col items-start gap-4 mt-4">
                <ProductBtn
                  productId={products.id}
                  productName={products.name}
                  productPrice={products.price}
                  productImages={products.images}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PageProduct;
