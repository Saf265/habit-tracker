"use client";

import toast from "react-hot-toast";

export const successCreate = () => {
  toast.success("Habit created with success");
};

export const successEdit = () => {
  toast.success("Habit edited with success");
};

export const successDelete = async () => {
  toast.success("Habit deleted with success");
};
