import { create } from "zustand";

type UserStore = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

export const useUserStore = create<UserStore>(() => ({
  user: {
    name: "Rupsnigdha Kashyap",
    email: "rupsnigdha@gmail.com",
    avatar: "https://i.pinimg.com/736x/35/af/20/35af20c90ba971f7fe83f3446b8b00ad.jpg",
  },
}));
