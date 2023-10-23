import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const WelcomMsg = async () => {
  const user = await currentUser();
  if (!user) return <div>Error</div>;

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl ">
      خوش آمدی, <br />
        {user.firstName} {user.lastName}
      </h1>
    </div>
  );
};

export default WelcomMsg;
