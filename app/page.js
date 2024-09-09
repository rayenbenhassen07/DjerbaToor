import ClientOnly from "../Components/ClientOnly";
import HomePage from "../Components/HomePage";

export default function Home() {
  return (
    <>
      <ClientOnly>
        <HomePage />
      </ClientOnly>
    </>
  );
}
