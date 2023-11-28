import Image from "next/image";
import React from "react";
import RegisterForm from "../../components/RegisterForm";
import Head from "next/head";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="max-w-7xl mx-auto h-screen flex relative flex-col justify-between items-center">
        <div
          className="self-center absolute top-8 hover:cursor-pointer"
          onClick={() => router.push("/")}
        >
          <h1 className="text-3xl font-bold">Shopidel</h1>
        </div>
        <div className="flex-1  w-full mx-auto flex justify-around items-center">
          <div className="hidden md:flex">
            <img
              src={"/vm2/images/auth_hero.png"}
              width={400}
              height={400}
              alt="auth_hero"
            />
          </div>
          <div className="">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
