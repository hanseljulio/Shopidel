import Navbar from "../components/Navbar";
import Card from "../components/Cards";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 gap-4">
        <Card
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <Card
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <Card
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <Card
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
        <Card
          image="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          price={20000}
          order={3000}
          title="Sun Flower flower flower flower flower flower"
          place="Malang"
          star={5}
        />
      </div>
    </div>
  );
}
