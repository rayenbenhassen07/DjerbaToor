"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"; // Assuming you're using Next.js
import Image from "next/image"; // Next.js Image component

const TripsGrid = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("/api/trips");
        setTrips(response.data.data); // Assuming response.data contains the array of trips
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    console.log(trips);

    fetchTrips();
  }, []);

  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-6">
      {trips.map((trip) => (
        <Link key={trip.id} href={`/product-category/excursions/${trip.slug}`}>
          <div className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg">
            <Image
              src={`http://75.119.130.218:8055/assets/${trip.main_img}`} // Full path to the image
              width="400"
              height="300"
              alt={trip.name}
              className="h-96 w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:filter group-hover:saturate-150 group-hover:brightness-75"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4 text-center">
              <h3 className="text-lg font-semibold text-white">{trip.name}</h3>
              <p className="text-white">${trip.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TripsGrid;
