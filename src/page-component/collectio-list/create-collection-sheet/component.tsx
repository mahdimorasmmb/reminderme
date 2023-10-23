import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  createCollectionSchema,
  createCollectionSchemaType,
} from "@/schema/createCollection";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CollectionColor, CollectionColors } from "@/lib/contants";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { createCollection } from "@/actions/collection";
import { toast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateCollectionSheet: FC<Props> = ({ onOpenChange, open }) => {
  const router = useRouter()
  const form = useForm<createCollectionSchemaType>({
    defaultValues: {},
    resolver: zodResolver(createCollectionSchema),
  });

  const onSubmit = async (data: createCollectionSchemaType) => {
    try {
      await createCollection(data);
      openCahngeWrapper(false)
      toast({
        title: "موفقیت",
        description: "مجموعه با موفقیت ایجاد شد",
        className:'w-full'
      });
      router.refresh()
    } catch (error) {
        openCahngeWrapper(false)
      toast({
        title: "Error",
        description: "Somthing went wrong , Please try again later",
        variant: "destructive",
      });
      
    }
  };

  const openCahngeWrapper = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };
  return (
    <Sheet open={open} onOpenChange={openCahngeWrapper}>
      <SheetContent dir="rtl" className="rt">
        <SheetHeader>
          <SheetTitle>افزودن مجموعه جدید</SheetTitle>
          <SheetDescription>
          مجموعه ها راهی برای گروه بندی وظایف شما هستند
          </SheetDescription>
        </SheetHeader>
        <Form  {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input placeholder="شخصی" {...field} />
                  </FormControl>
                  <FormDescription>نام مجموعه</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رنگ</FormLabel>
                  <FormControl>
                    <Select dir="rtl" onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          "w-full h-8 text-white",
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue
                          placeholder="رنگ"
                          className="w-full h-8"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            value={color}
                            key={color}
                            className={cn(
                              "w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8",
                              CollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                  رنگی را برای مجموعه خود انتخاب کنید
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button
          disabled={form.formState.isSubmitting}
            variant={"outline"}
            className={cn(
              CollectionColors[form.getValues("color") as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            مطابقت دهید
            {form.formState.isSubmitting && (
                <ReloadIcon className="ml-2 h-4 w-4 animate-spin"/>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCollectionSheet;
