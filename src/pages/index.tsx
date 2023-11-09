import CarouselHome from "@/components/Carousel";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Category from "@/components/Category";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <CarouselHome />
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 mb-5">
        <div>
          <p className="text-lg md:text-xl mt-10 mb-3 py-2 font-semibold text-center text-[#29374e]">
            Category
          </p>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-9 gap-x-4 gap-y-4">
          <Category
            src="baju_bayi.png"
            text="Fashion Baby"
            alt="Fashion Baby"
          />
          <Category src="elektornik.png" alt="Electronic" text="Electronic" />
          <Category
            src="fashion.png"
            alt="ElectrFashion and Accessoriesonic"
            text="Fashion and Accessories"
          />
          <Category
            src="food.png"
            text="Foods and Drinks"
            alt="Foods and Drinks"
          />
          <Category
            src="handphone.png"
            text="Handphone and Accessories"
            alt="Handphone and Accessories"
          />
          <Category src="jam.png" text="jam" alt="jam" />
          <Category
            src="laptop.png"
            alt="Computer and Accessories"
            text="Computer and Accessories"
          />
          <Category src="tas_wanita.png" alt="Woman's Bag" text="Woman's Bag" />
          <Category src="make_up.png" alt="Beauty" text="Beauty" />
          <Category src="obat.png" alt="Medicine" text="Medicine" />
          <Category
            src="pakaian_laki.jpg"
            alt="Men's Fashion"
            text="Men's Fashion"
          />
          <Category
            src="pakaian_wanita.jpg"
            alt="Woman's Fashion"
            text="Woman's Fashion"
          />
          <Category
            src="rumah_tangga.png"
            alt="Home Appliance"
            text="Home Appliance"
          />
          <Category
            src="sepatu_laki.png"
            alt="Men's Shoes"
            text="Men's Shoes"
          />
          <Category
            src="sepatu_wanita.png"
            alt="Woman's Shoes"
            text="Woman's Shoes"
          />
          <Category
            src="souvenir_party.png"
            alt="Souvenir Party"
            text="Souvenir Party"
          />
          <Category src="sports.png" alt="Sports" text="Sports" />
          <Category src="tas.png" alt="Men's Bag" text="Men's Bag" />
        </div>
        <div>
          <p className="text-lg md:text-xl mt-14 mb-3 py-2 font-semibold text-center text-[#29374e]">
            Recommendation
          </p>
        </div>
        <div className="justify-between gap-x-4 gap-y-4 grid grid-cols-2 md:grid-cols-5">
          <ProductCard
            showStar={true}
            image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            price={"20000"}
            order={3000}
            title="Sun Flower flower flower flower flower flower"
            place="Malang"
            star={5}
          />
          <ProductCard
            showStar={true}
            image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            price={"20000"}
            order={3000}
            title="Sun Flower flower flower flower flower flower"
            place="Malang"
            star={5}
          />
          <ProductCard
            showStar={true}
            image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            price={"20000"}
            order={3000}
            title="Sun Flower flower flower flower flower flower"
            place="Malang"
            star={5}
          />
          <ProductCard
            showStar={true}
            image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            price={"20000"}
            order={3000}
            title="Sun Flower flower flower flower flower flower"
            place="Malang"
            star={5}
          />
          <ProductCard
            showStar={true}
            image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            price={"20000"}
            order={3000}
            title="Sun Flower flower flower flower flower flower"
            place="Malang"
            star={5}
          />
          <ProductCard
            showStar={true}
            image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            price={"20000"}
            order={3000}
            title="Sun Flower flower flower flower flower flower"
            place="Malang"
            star={5}
          />
          <ProductCard
            showStar={true}
            image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            price={"20000"}
            order={3000}
            title="Sun Flower flower flower flower flower flower"
            place="Malang"
            star={5}
          />
          <ProductCard
            showStar={true}
            image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            price={"20000"}
            order={3000}
            title="Sun Flower flower flower flower flower flower"
            place="Malang"
            star={5}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
