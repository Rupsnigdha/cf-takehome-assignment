import { create } from "zustand";

type ExecutionStore = {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

export const useExecutionStore = create<ExecutionStore>((set) => ({
  isDialogOpen: false,
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
})); 