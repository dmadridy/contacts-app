import { create, useStore } from "zustand";

type Step = "basic" | "contact";

interface ContactData {
  basicInfo: {
    firstName: string;
    lastName: string;
    keywords: string[];
  };
  contactInfo: {
    email: string;
    phone: string;
  };
}

interface CreateContactStore {
  step: Step;
  setStep: (step: Step) => void;
  data: ContactData;
  setData: (newData: Partial<ContactData>) => void;
  reset: () => void;
}

const initialData: ContactData = {
  basicInfo: {
    firstName: "",
    lastName: "",
    keywords: [],
  },
  contactInfo: {
    email: "",
    phone: "",
  },
};

export const createContactStore = create<CreateContactStore>((set, get) => ({
  step: "basic",
  setStep: (step) => set({ step }),
  data: initialData,
  setData: (newData) => {
    const currentData = get().data;
    set({
      data: {
        ...currentData,
        ...newData,
      },
    });
  },
  reset: () =>
    set({
      step: "basic",
      data: initialData,
    }),
}));

export const useCreateContactStore = <T>(
  selector: (state: CreateContactStore) => T,
): T => useStore(createContactStore, selector);
