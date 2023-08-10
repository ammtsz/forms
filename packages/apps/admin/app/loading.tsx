import Feedback from "@components/Feedback";
import React from "react";

const Loading = () => {
  return (
    <div className="h-[80vh]">
      <Feedback isLoading />
    </div>
  );
};

export default Loading;
