"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Loader from "@/Components/Loader";

const SinglePageProduct = ({ slug }) => {
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState([]); // State for options
  const [error, setError] = useState(null);
  const [errorReservation, setErrorReservation] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [singleQuads, setSingleQuads] = useState(0); // Single quads selected
  const [doubleQuads, setDoubleQuads] = useState(0); // Double quads selected
  const [finalPrice, setFinalPrice] = useState(0); // Final price
  const [selectedOptions, setSelectedOptions] = useState([]); // Store selected options as an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trip data based on the slug
        const tripResponse = await axios.get(`/api/trip/${slug}`);
        const tripData = tripResponse.data.data[0];
        setData(tripData);

        // Fetch images for the trip based on the trip_id
        if (tripData && tripData.id) {
          const imagesResponse = await axios.get(
            `/api/trip/images/${tripData.id}`
          );
          setImages(imagesResponse.data.data);
          // Set the first image as the active one initially
          setActiveImage(imagesResponse.data.data[0]?.image_url);

          // Fetch options for the trip based on the trip_id
          const optionsResponse = await axios.get(
            `/api/trip/options/${tripData.id}`
          );
          setOptions(optionsResponse.data.data);
        }
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    if (data) {
      const basePrice = Number(data.price); // Ensure basePrice is a number

      // Add additional price based on selected options
      const optionsPrice = selectedOptions.reduce((acc, optionId) => {
        const option = options.find((o) => o.id === optionId);
        return acc + (option ? Number(option.additional_price) : 0);
      }, 0);

      const totalPrice = basePrice + optionsPrice;

      // Set final price
      setFinalPrice(Number(totalPrice).toFixed(2));
    }
  }, [singleQuads, doubleQuads, data, selectedOptions, options]);

  const handleOptionClick = (id) => {
    const clickedOption = options.find((option) => option.id === id);

    setSelectedOptions((prev) => {
      const filteredOptions = prev.filter((optionId) => {
        const option = options.find((o) => o.id === optionId);
        return option.option_name !== clickedOption.option_name;
      });

      // If the clicked option is already selected, subtract its additional price
      if (prev.includes(id)) {
        setFinalPrice(finalPrice - clickedOption.additional_price);
        return filteredOptions;
      }

      // Otherwise, add its additional price
      setFinalPrice(finalPrice + clickedOption.additional_price);
      return [...filteredOptions, id];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather selected options with their values
    const reservationData = {
      singleQuads,
      doubleQuads,
      finalPrice,
      selectedOptions: selectedOptions
        .map((optionId) => {
          const option = options.find((o) => o.id === optionId);
          return option
            ? {
                name: option.option_name,
                value: option.option_type,
              }
            : null;
        })
        .filter((option) => option !== null),
    };

    // Check if each option group has at least one selected option
    const groupedOptions = options.reduce((acc, option) => {
      (acc[option.option_name] = acc[option.option_name] || []).push(option);
      return acc;
    }, {});

    const missingOptions = Object.entries(groupedOptions).some(
      ([optionName, group]) => {
        return !reservationData.selectedOptions.some(
          (selected) => selected.name === optionName
        );
      }
    );

    if (missingOptions) {
      setErrorReservation("Please select an option for each option group.");
      return;
    }

    // Check specific condition for 'periode' and 'time' options
    const periodeOption = reservationData.selectedOptions.find(
      (option) => option.name === "periode"
    );
    const timeOption = reservationData.selectedOptions.find(
      (option) => option.name === "time"
    );

    if (
      periodeOption &&
      periodeOption.value === "3h" &&
      (!timeOption || timeOption.value !== "7:00 AM")
    ) {
      setErrorReservation(
        "If you choose 'periode' as 3h, you must choose 'time' as 7:00 AM."
      );
      return;
    }

    setErrorReservation(null);
    console.log("Reservation Data:", JSON.stringify(reservationData, null, 2));

    // Submit logic here (e.g., send reservation data to the server)
  };

  if (error) {
    return <p className="text-red-500">Error fetching data: {error.message}</p>;
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6 pt-40">
        <div className="grid gap-3 items-start">
          <div className="grid gap-4">
            {/* Display main image */}
            {activeImage && (
              <Image
                src={`http://75.119.130.218:8055/assets/${activeImage}`}
                alt={data.name}
                width={600}
                height={900}
                className="aspect-[4/5] object-cover border w-full rounded-lg overflow-hidden shadow-lg"
              />
            )}

            {/* Display thumbnails */}
            <div className="hidden md:flex gap-4 items-start">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(image.image_url)} // Set the clicked image as the active one
                  className={`border ${
                    activeImage === image.image_url
                      ? "border-primary"
                      : "border-neutral-700"
                  } hover:border-primary rounded-lg overflow-hidden transition-colors`}
                >
                  <img
                    src={`http://75.119.130.218:8055/assets/${image.image_url}`}
                    alt={`Preview thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="aspect-square object-cover"
                  />
                  <span className="sr-only">View Image {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 items-start">
          {/* Title */}
          <h1 className="font-extrabold text-4xl lg:text-5xl">{data.name}</h1>

          {/* Price */}
          <div className="text-3xl font-bold text-primary">{data.price} dt</div>

          {/* Remarque */}
          <div className="grid text-sm space-y-3">
            <div
              dangerouslySetInnerHTML={{ __html: data.remarque_question }}
              className="leading-relaxed"
            />
            <div className="text-neutral-400">
              Le créneau de 17h00 est sur demande via notre WhatsApp <br /> +216
              94 398 054.
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid gap-6 md:gap-10">
            <div className="flex justify-start items-center gap-10">
              {/* Total Quads */}

              {/* Only show single and double quad inputs if totalQuads is greater than 0 */}
            </div>

            {/* Options */}
            {options.length > 0 && (
              <div className="grid gap-4">
                {/* Group options by option_name */}
                {Object.entries(
                  options.reduce((acc, option) => {
                    (acc[option.option_name] =
                      acc[option.option_name] || []).push(option);
                    return acc;
                  }, {})
                ).map(([optionName, groupedOptions]) => (
                  <div key={optionName} className="grid gap-4">
                    <label className="text-base font-semibold">
                      {optionName} :
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {groupedOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`flex items-center gap-2 p-2 cursor-pointer border-2 rounded ${
                            selectedOptions.includes(option.id)
                              ? "border-primary"
                              : "border-neutral-600"
                          }`}
                          onClick={() => handleOptionClick(option.id)}
                        >
                          <span className="text-base font-semibold">
                            {option.option_type} (+{option.additional_price} dt)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error message for reservation */}
            {errorReservation && (
              <div className="text-red-500">{errorReservation}</div>
            )}

            <div className="flex flex-col gap-2">
              <div className="text-end font-bold text-primary">
                Final Price: {finalPrice} dt
              </div>
              <button
                type="submit"
                className="bg-primary text-white rounded-lg py-3 px-6 text-lg shadow-md hover:bg-primary-dark transition duration-300"
              >
                Réserver
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Description at the bottom */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-bold text-2xl mb-4">Description</h2>
        <div
          className="text-base leading-relaxed text-neutral-300"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
    </div>
  );
};

export default SinglePageProduct;
