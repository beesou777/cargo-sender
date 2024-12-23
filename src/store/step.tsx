import { create } from "zustand";

type steeperStoreT = {
  activeStep: number;
  setStep: (step: number) => void;
};

export const useSteeper = create<steeperStoreT>((set) => ({
  activeStep: 0,
  setStep: (step: number) =>
    set(() => {
      return { activeStep: step };
    }),
}));
