// @ts-nocheck
"use client";

import { useState } from "react";

const useToggle = (initialState = false) => {
  const [value, setValue] = useState(initialState);

  const toggle = () => setValue((current) => !current);

  return { value, setValue, toggle };
};

export default useToggle;
