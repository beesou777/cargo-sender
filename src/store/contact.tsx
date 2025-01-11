import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ContactDetailT = {
  email: string;
  newsletterSubscription: boolean;
  error?: boolean;
};

type contactStore = {
  contactList: ContactDetailT[];
  addContact: () => void;
  editEmail: (index: number, email: string) => void;
  editSubscription: (index: number, checked: boolean) => void;
  removeContact: (index: number) => void;
  isValid: () => boolean;
};

export const useContactStore = create(
  persist<contactStore>(
    (set, get) => ({
      contactList: [
        { email: "", newsletterSubscription: false },
        { email: "", newsletterSubscription: false },
      ],
      addContact: () =>
        set((prev_state) => {
          return {
            contactList: [
              ...prev_state.contactList,
              { email: "", newsletterSubscription: false },
            ],
          };
        }),
      editEmail: (activeIndex, data) =>
        set((prev_state) => ({
          contactList: prev_state.contactList.map((item, index) => {
            if (index === activeIndex) return { ...item, email: data };
            else return item;
          }),
        })),
      editSubscription: (activeIndex, data) =>
        set((prev_state) => ({
          contactList: prev_state.contactList.map((item, index) => {
            if (index === activeIndex)
              return { ...item, newsletterSubscription: data };
            else return item;
          }),
        })),
      removeContact: (activeIndex) =>
        set((prev_state) => ({
          contactList: prev_state.contactList.filter(
            (_, index) => index != activeIndex
          ),
        })),
      isValid: () => {
        const schema = z.array(
          z.object({
            email: z.string().email(),
            newsletterSubscription: z.boolean(),
          })
        );
        return schema.safeParse(get().contactList).success;
      },
    }),
    {
      name: "contact-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
