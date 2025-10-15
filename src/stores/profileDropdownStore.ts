import {create} from "zustand";

interface ProfileDropdownState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
}

const profileDropdownStore = create<ProfileDropdownState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({isOpen}),
  toggle: () => set((state) => ({isOpen: !state.isOpen}))
}))

export default profileDropdownStore;
