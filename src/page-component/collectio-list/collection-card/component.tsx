"use client";

import { deleteCollection } from "@/actions/collection";
import PlusIcons from "@/components/icons/PlusIcons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { CollectionColor, CollectionColors } from "@/lib/contants";
import { cn } from "@/lib/utils";
import { Collection, Task } from "@prisma/client";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { FC, useMemo, useState, useTransition } from "react";
import CreateTaskDialog from "../create-task-dialog";
import TaskeCard from "./task-card";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/green.css";

import { Calendar } from "react-multi-date-picker";

type Props = {
  collection: Collection & {
    tasks: Task[];
  };
};

// const tasks = ["Taskw 1", "Taske 2", "Taske 3"];

function MyPlugin() {
  return <h1 className="text-red-900">Hifsdfsdfsdfsdf</h1>;
}

const CollectionCard: FC<Props> = ({ collection }) => {
  const { tasks } = collection;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, startTransition] = useTransition();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast({
        title: "موفقیت",
        description: "مجموعه با موفقیت حذف شد",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Cannot delete collection",
        variant: "destructive",
      });
    }
  };

  const tasksDone = useMemo(() => {
    return collection.tasks.filter((task) => task.done).length;
  }, [collection.tasks]);

  const totalTasks = collection.tasks.length;

  const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100;
  return (
    <>
      <Calendar
        className="green"
        plugins={[<MyPlugin position="top" />]}
        calendar={persian}
        locale={persian_fa}
      />
      <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-full justify-between p-6",
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold"> {collection.name}</span>
            {!isOpen && <CaretDownIcon className="h-6 w-6" />}
            {isOpen && <CaretUpIcon className="h-6 w-6" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {tasks.length === 0 && (
            <Button
              variant={"ghost"}
              className="flex items-center justify-center gap-1 p-8 py-12 rounded-none"
              onClick={() => setShowCreateModal(true)}
            >
              <p>هنوز هیچ وظیفه ای وجود ندارد: </p>
              <span
                className={cn(
                  "text-sm bg-clip-text text-transparent",
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                ایجاد کنید
              </span>
            </Button>
          )}
          {tasks.length > 0 && (
            <>
              <Progress className="rounded-none" value={progress} />
              <div className="p-4 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <TaskeCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center">
            <p>Created at {collection.createdAt.toLocaleDateString("en-US")}</p>
            {isLoading && <div>در حال حذف ...</div>}
            {!isLoading && (
              <div>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  size={"icon"}
                  variant={"ghost"}
                >
                  <PlusIcons />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>آیا کاملا مطمئن هستید؟</AlertDialogTitle>
                    <AlertDialogDescription>
                      این عمل قابل لغو نیست. این برای همیشه حذف خواهد شد مجموعه
                      شما و تمام وظایف داخل آن.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>لغو کنید</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => startTransition(removeCollection)}
                      >
                        ادامه دهید
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default CollectionCard;
