import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type steeperStoreT = {
  activeStep: number;
  setStep: (step: number) => void;
};

export const useSteeper = create(
  persist<steeperStoreT>(
    (set) => ({
      activeStep: 0,
      setStep: (step: number) =>
        set(() => {
          return { activeStep: step };
        }),
    }),
    {
      name: "step-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
