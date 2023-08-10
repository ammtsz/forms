"use client";

import FormButtons from "@components/Home/FormButtons";
import IsSignedIn from "@components/IsSignedIn";

const Home: React.FC = () => {
  return (
    <IsSignedIn>
      <main className="flex flex-col items-center justify-between p-24">
        <FormButtons />
      </main>
    </IsSignedIn>
  );
};

export default Home;
