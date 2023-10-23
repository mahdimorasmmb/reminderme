
import { createTask } from "@/actions/task";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CollectionColor, CollectionColors } from "@/lib/contants";
import { cn } from "@/lib/utils";
import { createTaskeSchema, createTaskeSchemaType } from "@/schema/createTaske";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collection } from "@prisma/client";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  collection: Collection;
  setOpen: (open: boolean) => void;
};

function MyPlugin() {
  return <>
  Hi
  </>
}

const CreateTaskDialog: FC<Props> = ({ collection, open, setOpen }) => {
  const router = useRouter();
  const form = useForm<createTaskeSchemaType>({
    resolver: zodResolver(createTaskeSchema),
    defaultValues: {
      collectionId: collection.id,
    },
  });
  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  const onSubmit = async (data: createTaskeSchemaType) => {
    try {
      await createTask(data);
      toast({
        title: "Success",
        description: "Task created successfully!",
      });
      onOpenChangeWrapper(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "cannot create task",
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            اضافه کردن کار به مجموعه
            <span
              className={cn(
                "p-[1px] bg-clip-text text-transparent",
                CollectionColors[collection.color as CollectionColor]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
          <DialogDescription>
            یک کار را به مجموعه خود اضافه کنید. می توانید هر تعداد کار که می
            خواهید به یک مجموعه اضافه کنید.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              className="space-y-4 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>محتوا</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="محتوای تکلیف را اینجا مطرح کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormDescription>
                      چه زمانی باید این وظیفه منقضی شود
                    </FormDescription>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value && format(field.value, "PPP")}
                            {!field.value && <span>بدون انقضا</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
         
        </div>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className={cn(
              "w-full dark:text-white ",
              CollectionColors[collection.color as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            مطابقت دهید
            {form.formState.isSubmitting && (
              <ReloadIcon className="animate-spin h-4 w-4 ml-2" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
