import Image from "next/image";
import Link from "next/link";
import React from "react";
import TripsGrid from "./TripsGrid";

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
        <div>
          <Link href="/product-category/excursions">
            <h2 className="w-full flex justify-center items-center font-bold text-2xl mb-10">
              EXCURSIONS
            </h2>
          </Link>
          <TripsGrid />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
