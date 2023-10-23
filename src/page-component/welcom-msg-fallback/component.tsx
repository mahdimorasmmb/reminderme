import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const WelcomMsgFallback = () => {
  return (
    <div className="flex w-full mb-12">
      <h1 className="font-bold text-4xl">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
};

export default WelcomMsgFallback;
