"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Excursions = () => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col justify-center items-center text-white pt-20 min-h-screen bg-neutral-800">
      <header className="bg-gradient-to-r from-neutral-700 to-neutral-800 py-12 md:py-20 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Elevate Your Esports Experience
              </h1>
              <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                Discover the latest tournaments, top players, and trending games
                on our cutting-edge esports platform.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Join Now
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Watch Tournaments
                </Link>
              </div>
            </div>
            <img
              src="/jetski.jpeg"
              width="800"
              height="600"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </header>

      <section className="w-full  py-12 md:py-24 lg:py-32 ">
        <h2 className="w-full flex justify-center items-center font-bold text-2xl mb-10">
          EXCURSIONS
        </h2>
        <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-6">
          <div
            onClick={() => {
              router.push("/product-category/excursions/jetski-trip");
            }}
            className="group relative cursor-pointer overflow-hidden rounded-xl   bg-white shadow-lg"
          >
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

          <div
            onClick={() => {
              router.push("/product-category/excursions/quad-trip");
            }}
            className="group relative cursor-pointer overflow-hidden rounded-xl   bg-white shadow-lg"
          >
            <Image
              src="/quad.jpeg"
              width="400"
              height="300"
              alt="Product"
              className="h-96 w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:filter group-hover:saturate-150 group-hover:brightness-75"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4 text-center">
              <h3 className="text-lg font-semibold text-white">QUAD & BUGGY</h3>
              <p className="text-white">$59.99</p>
            </div>
          </div>

          <div
            onClick={() => {
              router.push("/product-category/excursions/rasrmal-trip");
            }}
            className="group relative cursor-pointer overflow-hidden rounded-xl   bg-white shadow-lg"
          >
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

          <div
            onClick={() => {
              router.push("/product-category/excursions/sahara-trip");
            }}
            className="group relative cursor-pointer overflow-hidden rounded-xl   bg-white shadow-lg"
          >
            <Image
              src="/sahara.jpeg"
              width="400"
              height="300"
              alt="Product"
              className="h-96 w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:filter group-hover:saturate-150 group-hover:brightness-75"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4 text-center">
              <h3 className="text-lg font-semibold text-white">Sahara Trip</h3>
              <p className="text-white">$49.99</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Excursions;
