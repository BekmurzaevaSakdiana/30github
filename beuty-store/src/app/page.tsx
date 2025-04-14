import Cards from "@/components/Cards";
import MainSearchProduct from "@/components/MainSearchProducts";
import Mission from "@/components/Mission";
import SwiperSection from "@/components/SwiperSection";
import WhyUs from "@/components/WhyUs";
import { ProductsUtils } from "@/requests/productsReq";

type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default async  function Home({searchParams}: PageProps) {
  return (
   <>
    <MainSearchProduct />
   <SwiperSection/>
    <Cards searchParams={searchParams} />
    <WhyUs/>
    <Mission/>

   </>
  );
}
