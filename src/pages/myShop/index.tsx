import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import React from "react";

function index() {
  return (
    <div>
      <Navbar />
      <p className="title text-2xl font-semibold">
        Come on, fill in your shop details!
      </p>
      <form action="">
        <Input
          label="Store Name"
          labelStyle="mt-2"
          styling="flex items-center gap-[77px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
          width="w-[250px]"
          type="text"
          name="storeName"
          value=""
        />
        <Input
          label="Store Address"
          labelStyle="mt-2"
          styling="flex items-center gap-[75px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
          width="w-[250px]"
          type="text"
          name="storeName"
        />
      </form>
    </div>
  );
}

export default index;
