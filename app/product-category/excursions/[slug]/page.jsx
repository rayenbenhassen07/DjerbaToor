import SinglePageProduct from "@/Components/pages/singleProduct/SinglePageProduct";
import React from "react";

function capitalizeSlug(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export async function generateMetadata({ params }) {
  const formattedSlug = capitalizeSlug(params.slug);
  return {
    title: `Jediwa | ${formattedSlug}`,
  };
}

const page = ({ params }) => {
  return (
    <div>
      <SinglePageProduct slug={params.slug} />
    </div>
  );
};

export default page;
