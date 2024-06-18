import { createContext } from "react";

export const FilterContext = createContext({
  data: "",
  updateData: (value: string) => {},
});
