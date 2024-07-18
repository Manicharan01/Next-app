import { selector } from "recoil";
import { adminState, Admin } from "../atoms/admin";

export const getAdminState = selector<Admin[]>({
  key: "adminUsernameState",
  get: ({ get }) => {
    const admin = get(adminState);
    return admin;
  },
});
