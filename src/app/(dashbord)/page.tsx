import { Button } from "@/components/ui/button";
import { CollectionList, WelcomMsg, WelcomMsgFallback } from "@/page-component";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomMsgFallback />}>
        <WelcomMsg />
      </Suspense>
      <Suspense fallback={<div>loding .......</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}
