import CarouselHome from "@/components/Carousel";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <CarouselHome />
      <div className="grid grid-cols-9  mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 gap-x-4 gap-y-4">
        <div>
          <img
            src="/categories/baju_bayi.png"
            alt="baju bayi"
            className="rounded-full w-20  flex mx-auto"
          />
          <p className="text-center text-xs">Fashion Baby</p>
        </div>
        <div>
          <img
            src="/categories/elektornik.png"
            alt="elektronik"
            className="rounded-full w-20  flex mx-auto"
          />
          <p className="text-center text-xs">Electronic</p>
        </div>
        <div>
          <img
            src="/categories/fashion.png"
            alt="Fashion and Accessories"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Fashion and Accessories</p>
        </div>
        <div>
          <img
            src="/categories/food.png"
            alt="Food"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Foods and Drinks</p>
        </div>
        <div>
          <img
            src="/categories/handphone.png"
            alt="Handphone"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Handphone and Accessories</p>
        </div>
        <div>
          <img
            src="/categories/jam.png"
            alt="Hand Watch"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Watch</p>
        </div>
        <div>
          <img
            src="/categories/laptop.png"
            alt="Laptop"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Computer and Accessories</p>
        </div>
        <div>
          <img
            src="/categories/tas_wanita.png"
            alt="Woman's Bag"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Woman&apos;s Bag</p>
        </div>
        <div>
          <img
            src="/categories/make_up.png"
            alt="Beuty"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Beauty</p>
        </div>
        <div>
          <img
            src="/categories/obat.png"
            alt="Medicine"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Medicine</p>
        </div>
        <div>
          <img
            src="/categories/pakaian_laki.png"
            alt="Men's Fashion"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Men&apos;s Fashion</p>
        </div>
        <div>
          <img
            src="/categories/pakaian_wanita.png"
            alt="Woman's Fashion"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Woman&apos;s Fashion</p>
        </div>
        <div>
          <img
            src="/categories/rumah_tangga.png"
            alt="Home Appliance"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Home Appliance</p>
        </div>
        <div>
          <img
            src="/categories/sepatu_laki.png"
            alt="Men's Shoes"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Men&apos;s Shoes</p>
        </div>
        <div>
          <img
            src="/categories/sepatu_wanita.png"
            alt="Woman's Shoes"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Woman&apos;s Shoes</p>
        </div>
        <div>
          <img
            src="/categories/souvenir_party.png"
            alt="Souvenir Party"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Souvenir Party</p>
        </div>
        <div className="flex flex-col gap-3">
          <img
            src="/categories/sports.png"
            alt="Sports"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Sports</p>
        </div>
        <div>
          <img
            src="/categories/tas.png"
            alt="Men's Bag"
            className="rounded-full w-20   flex mx-auto"
          />
          <p className="text-center text-xs">Men&apos;s Bag</p>
        </div>
      </div>
      <div>
        <p className="text-lg mt-10 py-2 font-semibold text-center text-[#29374e]">
          RECOMMENDATION
        </p>
      </div>
      <div className="justify-between  mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 gap-x-4 gap-y-4 grid grid-cols-2 md:grid-cols-5">
        <ProductCard
          showStar={true}
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <ProductCard
          showStar={true}
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <ProductCard
          showStar={true}
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <ProductCard
          showStar={true}
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <ProductCard
          showStar={true}
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <ProductCard
          showStar={true}
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <ProductCard
          showStar={true}
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <ProductCard
          showStar={true}
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
      </div>
      <Footer />
    </div>
  );
}
