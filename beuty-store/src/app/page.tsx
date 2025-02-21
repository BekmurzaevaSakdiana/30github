import Cards from "@/components/Cards";
import MainSearchProduct from "@/components/MainSearchProducts";
import Mission from "@/components/Mission";
import SwiperSection from "@/components/SwiperSection";
import WhyUs from "@/components/WhyUs";
import { ProductsUtils } from "@/requests/productsReq";

export default async  function Home() {
  return (
   <>
    {/* {productsByBrands?.results?.length ? <MainSearchProduct params={{ id: "someBrandId" }} searchParams={{}} /> : null} */}
   <SwiperSection/>
    <Cards/>
    <WhyUs/>
    <Mission/>

   </>
  );
}
