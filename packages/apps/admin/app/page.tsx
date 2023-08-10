"use client";

import FormButtons from "@components/Home/FormButtons";
import IsSignedIn from "@components/IsSignedIn";

const Home: React.FC = () => {
  return (
    <IsSignedIn>
      <main className="flex_center flex-col p-24">
        <FormButtons />
      </main>
    </IsSignedIn>
  );
};

export default Home;
