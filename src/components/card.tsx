"use client";
import React from "react";
import { deleteTodo } from "@/service/mutation/todo-mutation";
import { toast } from "react-toastify";
import { Modal } from "./modal";
import { UserForm } from "./user-form";

export const Card = ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: number;
}) => {
  const [isloading, setLoading] = React.useTransition();
  const [isopen, setIsopen] = React.useState(false);

  const deleteData = () => {
    setLoading(async () => {
      try {
        const res = await deleteTodo(id);
        console.log(res, "awdawd");
      } catch (error) {
        const err = error as Error;
        toast.error(err.message, {
          position: "top-right",
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl text-blue-400">{title}</h1>
      <p>{description}</p>
      <button
        disabled={isloading}
        onClick={deleteData}
        className="p-[10px] bg-red-400"
      >
        {isloading ? "Loading..." : "delete"}
      </button>
      <button
        disabled={isloading}
        onClick={() => setIsopen(true)}
        className="p-[10px] bg-blue-400"
      >
        {isloading ? "Loading..." : "Edit"}
      </button>
      <Modal close={() => setIsopen(false)} isOpen={isopen}>
        <UserForm description={description} title={title} id={id} setIsopen={setIsopen} />
      </Modal>
    </div>
  );
};
