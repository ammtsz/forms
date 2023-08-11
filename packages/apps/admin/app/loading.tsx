import React from "react";

import Feedback from "@app/components/Feedback";

const Loading = () => {
  return (
    <div className="h-[80vh]">
      <Feedback isLoading />
    </div>
  );
};

export default Loading;
