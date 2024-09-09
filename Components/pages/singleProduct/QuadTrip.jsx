"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Loader from "@/Components/Loader";
import { MdOutlineDoubleArrow } from "react-icons/md";

const QuadTrip = () => {
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState([]); // State to store options
  const [error, setError] = useState(null);
  const [errorReservation, setErrorReservation] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [totalQuads, setTotalQuads] = useState(0); // Total quads selected
  const [singleQuads, setSingleQuads] = useState(0); // Single quads selected
  const [doubleQuads, setDoubleQuads] = useState(0); // Double quads selected
  const [finalPrice, setFinalPrice] = useState(0); // Final price
  const [selectedOptions, setSelectedOptions] = useState([]); // Store selected options as an array
  const [loading, setLoading] = useState(true);

  // Update final price based on the selected quads and options
  useEffect(() => {
    if (data) {
      const singleQuadPrice = 60;
      const doubleQuadPrice = 70;
      const basePrice = Number(data.price); // Ensure basePrice is a number

      // Calculate the final price based on the number of single and double quads
      const newFinalPrice =
        basePrice +
        singleQuads * singleQuadPrice +
        doubleQuads * doubleQuadPrice;

      // Add additional price based on selected options
      const optionsPrice = selectedOptions.reduce((acc, optionId) => {
        const option = options.find((o) => o.id === optionId);
        return acc + (option ? Number(option.additional_price) : 0);
      }, 0);

      // Set final price
      setFinalPrice(Number(newFinalPrice + optionsPrice).toFixed(2));
    }
  }, [singleQuads, doubleQuads, data, selectedOptions, options]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripResponse, imagesResponse, optionsResponse] =
          await Promise.all([
            axios.get(`/api/trip/quad-trip`),
            axios.get(`/api/trip/images/3`),
            axios.get(`/api/trip/options/3`),
          ]);

        const tripData = tripResponse.data.data[0];
        setData(tripData);

        const imagesData = imagesResponse.data.data;
        setImages(imagesData);

        if (imagesData.length > 0) {
          setActiveImage(imagesData[0].image_url);
        }

        const optionsData = optionsResponse.data.data;
        setOptions(optionsData);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!data || images.length === 0 || options.length === 0) {
      fetchData();
    }
  }, [data, images, options]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (totalQuads <= 0) {
      setErrorReservation("You have to select one or more Quads.");
      return;
    }
    if (singleQuads + doubleQuads !== totalQuads) {
      setErrorReservation("You have to choose the right number of quads.");
      return;
    }

    // Prepare the data to log
    const reservationData = {
      totalQuads,
      singleQuads,
      doubleQuads,
      finalPrice,
      selectedOptions: selectedOptions
        .map((optionId) => {
          const option = options.find((o) => o.id === optionId);
          return option
            ? {
                id: option.id,
                name: option.option_name,
                value: option.value,
                additionalPrice: option.additional_price,
              }
            : null;
        })
        .filter((option) => option !== null),
    };

    // Check for conditions
    const periodeOption = reservationData.selectedOptions.find(
      (option) => option.name === "periode"
    );
    const timeOption = reservationData.selectedOptions.find(
      (option) => option.name === "time"
    );

    if (periodeOption.id == 2 && timeOption.id !== 3) {
      setErrorReservation(
        "If you choose 'periode' as 3h, you must choose 'time' as 7:00 AM."
      );
      return;
    }

    console.log("Periode Option:", periodeOption);
    console.log("Time Option:", timeOption);

    // Log the reservation data in JSON format
    console.log("Reservation Data:", JSON.stringify(reservationData, null, 2));

    setErrorReservation(null);
    // Add your submit logic here (e.g., send data to the server)
  };

  const handleOptionClick = (id) => {
    const clickedOption = options.find((option) => option.id === id);

    setSelectedOptions((prev) => {
      // Filter out options with the same option_name as the clicked one
      const filteredOptions = prev.filter((optionId) => {
        const option = options.find((o) => o.id === optionId);
        return option.option_name !== clickedOption.option_name;
      });

      // If the clicked option is already selected, return filtered options (deselect it)
      if (prev.includes(id)) {
        return filteredOptions;
      }

      // Otherwise, add the new option
      return [...filteredOptions, id];
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">Error fetching data: {error.message}</p>;
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
              <div className="grid gap-2">
                <label htmlFor="total-quads" className="text-base">
                  Nombre total de Quads
                </label>
                <div className="flex items-center gap-10">
                  <input
                    type="number"
                    id="total-quads"
                    value={totalQuads}
                    onChange={(e) => setTotalQuads(Number(e.target.value))}
                    className="w-24 border p-2 rounded text-black"
                    min="1"
                  />
                  <MdOutlineDoubleArrow size={25} />
                </div>
              </div>

              {/* Only show single and double quad inputs if totalQuads is greater than 0 */}
              {totalQuads > 0 && (
                <div className="flex gap-4">
                  {/* Single Quads */}
                  <div className="grid gap-2">
                    <label htmlFor="single-quads" className="text-base">
                      Quads Single
                    </label>
                    <input
                      type="number"
                      id="single-quads"
                      value={singleQuads}
                      onChange={(e) => setSingleQuads(Number(e.target.value))}
                      className="w-24 border p-2 rounded text-black"
                      min="0"
                      max={totalQuads - doubleQuads} // Ensure no more single quads than available
                    />
                  </div>

                  {/* Double Quads */}
                  <div className="grid gap-2">
                    <label htmlFor="double-quads" className="text-base">
                      Quads Doubles
                    </label>
                    <input
                      type="number"
                      id="double-quads"
                      value={doubleQuads}
                      onChange={(e) => setDoubleQuads(Number(e.target.value))}
                      className="w-24 border p-2 rounded text-black"
                      min="0"
                      max={totalQuads - singleQuads} // Ensure no more double quads than available
                    />
                  </div>
                </div>
              )}
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

export default QuadTrip;
