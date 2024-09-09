import { create } from "zustand";

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
  isValid: (contactList: ContactDetailT[]) => boolean;
  validate: () => void;
};

export const useContactStore = create<contactStore>((set, get) => ({
  contactList: [{ email: "", newsletterSubscription: false }],
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
  isValid: (cl) => {
    return cl.find((item) => item.error) ? false : true;
  },
  validate: () =>
    set((prev_state) => ({
      contactList: prev_state.contactList.map((item) => {
        if (!item.email || /^\S+@\S+$/.test(item.email))
          return { ...item, error: true };
        else return item;
      }),
    })),
}));
