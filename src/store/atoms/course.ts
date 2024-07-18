import { atom } from "recoil";

export type Course = {
  _id: string;
  title: string;
  description: string;
  imageLink: string;
  price: number;
};

export const courseState = atom<Course[]>({
  key: "courseState",
  default: [],
});
