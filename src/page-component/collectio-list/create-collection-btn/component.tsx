"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CreateCollectionSheet from "../create-collection-sheet";

const CreateCollectionBtn = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => setOpen(open);
  return (
    <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]">
      <Button
        onClick={() => setOpen(true)}
        className="w-full dark:text-white dark:bg-neutral-950 bg-white"
        variant={"outline"}
      >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
        مجموعه ایجاد کنید
        </span>
      </Button>
      <CreateCollectionSheet open={open} onOpenChange={handleOpenChange}/>
    </div>
  );
};

export default CreateCollectionBtn;
