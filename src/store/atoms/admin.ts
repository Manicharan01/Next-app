import { atom } from "recoil";

export type Admin = {
  username: string;
  password: string;
};

export const adminState = atom<Admin[]>({
  key: "adminState",
  default: [],
});
