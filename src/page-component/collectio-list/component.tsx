import SadeFace from "@/components/icons/SadeFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import CreateCollectionBtn from "./create-collection-btn";
import CollectionCard from "./collection-card";

const CollectionList = async () => {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0)
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadeFace />
          <AlertTitle>هنوز هیچ مجموعه ای وجود ندارد!</AlertTitle>
          <AlertDescription>
          برای شروع یک مجموعه ایجاد کنید
          </AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );

  return (
    <>
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 mt-5">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
};

export default CollectionList;
