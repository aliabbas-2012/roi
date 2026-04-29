// @ts-nocheck
"use client";

import { useRef } from "react";
import useAppSelector from "./useAppSelector";

const shallowEqual = (left, right) => {
  if (Object.is(left, right)) return true;
  if (!left || !right || typeof left !== "object" || typeof right !== "object") return false;

  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) return false;

  for (const key of leftKeys) {
    if (!Object.prototype.hasOwnProperty.call(right, key) || !Object.is(left[key], right[key])) {
      return false;
    }
  }

  return true;
};

const useShallowEqualSelector = (selector) => {
  const selected = useAppSelector(selector);
  const ref = useRef(selected);

  if (!shallowEqual(ref.current, selected)) {
    ref.current = selected;
  }

  return ref.current;
};

export default useShallowEqualSelector;
