// @ts-nocheck
"use client";

import { useStoreState } from "../store";

const useAppSelector = (selector) => {
  const state = useStoreState();
  return selector(state);
};

export default useAppSelector;
