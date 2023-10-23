import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-cneter">
      <div className="flex flex-grow w-full justify-center dark:bg-neutral-950">
        <div className="max-w-[920px] flex flex-grow flex-col px-4 py-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
