import {create} from "zustand";

interface NavbarSelectState {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const navbarSelectStore = create<NavbarSelectState>((set) => ({
  selectedIndex: 0,
  setSelectedIndex: (index) => set({selectedIndex: index})
}))

export default navbarSelectStore;
