import QuadTrip from "@/Components/pages/singleProduct/QuadTrip";
import React from "react";

export async function generateMetadata() {
  return {
    title: `Jediwa | Quad Trip`,
  };
}

const page = () => {
  return (
    <div>
      <QuadTrip />
    </div>
  );
};

export default page;
