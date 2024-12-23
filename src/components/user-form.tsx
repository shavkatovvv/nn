"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { createTodo, editTodo } from "@/service/mutation/todo-mutation";
import { Spinner } from "./spinner";

const createUserSchema = z.object({
  title: z.string().min(3, "eng kam qiymat 3 ta bratishka"),
  description: z.string().min(3, "eng kam qiymat 3 ta bratan"),
});

type IFormInput = z.infer<typeof createUserSchema>;

interface defaultValue {
  title?: string;
  description?: string;
  id?: string | number;
  setIsopen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserForm = (defaultValues: defaultValue) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: defaultValues || {},
  });

  const [transition, setTransition] = React.useTransition();

  const submit = (data: IFormInput) => {
    setTransition(async () => {
      if (defaultValues.id) {
        try {
          const res = await editTodo({
            description: data.description,
            title: data.title,
            id: defaultValues.id,
          });
          if (defaultValues.setIsopen) {
            defaultValues.setIsopen(false);
          }
        } catch (error) {}

        return;
      }
      try {
        const res = await createTodo(data);
        console.log(res);
      } catch (error) {}
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <input
          className="p-[10px] bg-cyan-100"
          placeholder="title"
          {...register("title")}
          type="text"
        />
        <p className="text-[12px] text-red-400">{errors.title?.message}</p>
      </div>
      <div>
        <input
          className="p-[10px] bg-cyan-100"
          placeholder="description"
          {...register("description")}
          type="text"
        />
        <p className="text-[12px] text-red-400">
          {errors.description?.message}
        </p>
      </div>
      <button
        disabled={transition}
        className="p-[10px] bg-green-400 flex gap-[5px] disabled:bg-green-100"
        type="submit"
      >
        {transition && <Spinner />} {defaultValues.id ? "edit" : "Send"}
      </button>
    </form>
  );
};
