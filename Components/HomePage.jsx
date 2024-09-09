import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full bg-neutral-800 text-white flex flex-col ">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 w-full mx-auto md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_650px] lg:gap-12 xl:grid-cols-[1fr_750px]">
            <Image
              src="/djerbaa.jpeg"
              width="750"
              height="500"
              alt="Hero"
              className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover the Best Products for Your Home
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Explore our curated collection of high-quality home goods and
                  accessories to elevate your living space.
                </p>
              </div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 text-white px-8 text-sm font-bold"
                prefetch={false}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <Link href="/product-category/excursions">
          <h2 className="w-full flex justify-center items-center font-bold text-2xl mb-10">
            EXCURSIONS
          </h2>
        </Link>

        <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-6">
          <Link href="/product/1">
            <div className="group relative cursor-pointer overflow-hidden rounded-xl   bg-white shadow-lg">
              <Image
                src="/jetski.jpeg"
                width="400"
                height="300"
                alt="Product"
                className="h-96 w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:filter group-hover:saturate-150 group-hover:brightness-75"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  ADRENALINE WAVE
                </h3>
                <p className="text-white">$29.99</p>
              </div>
            </div>
          </Link>

          <Link href="/product/1">
            <div className="group relative cursor-pointer overflow-hidden rounded-xl   bg-white shadow-lg">
              <Image
                src="/quad.jpeg"
                width="400"
                height="300"
                alt="Product"
                className="h-96 w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:filter group-hover:saturate-150 group-hover:brightness-75"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  QUAD & BUGGY
                </h3>
                <p className="text-white">$59.99</p>
              </div>
            </div>
          </Link>

          <Link href="/product/1">
            <div className="group relative cursor-pointer overflow-hidden rounded-xl   bg-white shadow-lg">
              <Image
                src="/rasrmal.jpeg"
                width="400"
                height="300"
                alt="Product"
                className="h-96 w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:filter group-hover:saturate-150 group-hover:brightness-75"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  ÎLE FLAMANTS ROSES
                </h3>
                <p className="text-white">$39.99</p>
              </div>
            </div>
          </Link>

          <Link href="/product/1">
            <div className="group relative cursor-pointer overflow-hidden rounded-xl   bg-white shadow-lg">
              <Image
                src="/sahara.jpeg"
                width="400"
                height="300"
                alt="Product"
                className="h-96 w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:filter group-hover:saturate-150 group-hover:brightness-75"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  Sahara Trip
                </h3>
                <p className="text-white">$49.99</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
