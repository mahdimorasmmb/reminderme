"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" enableSystem>
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
