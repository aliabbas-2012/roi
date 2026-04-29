// @ts-nocheck
"use client";

import useShallowEqualSelector from "./useShallowEqualSelector";

const stateFields = ["locale", "currency", "timeZone", "ids", "searchKey", "stateKey", "scope"];

const shallowMatch = (source, filters) =>
  Object.keys(filters).every((key) => String(source?.[key]) === String(filters[key]));

const useFilterSelector = (selector, filters = {}) => {
  return useShallowEqualSelector((state) => {
    const selected = selector(state);
    if (!selected || typeof selected !== "object" || !("data" in selected)) return selected;

    const dataFilters = Object.keys(filters)
      .filter((key) => !stateFields.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: filters[key] }), {});
    const stateFilters = Object.keys(filters)
      .filter((key) => stateFields.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: filters[key] }), {});

    const stateMatched = shallowMatch(selected, stateFilters);
    const { data } = selected;

    if (Array.isArray(data)) {
      if (!stateMatched) return { ...selected, data: [] };
      const filtered = data.filter((item) => shallowMatch(item, dataFilters));
      return { ...selected, data: filtered };
    }

    if (data && typeof data === "object") {
      const matched = stateMatched && shallowMatch(data, dataFilters);
      return { ...selected, data: matched ? data : {} };
    }

    return selected;
  });
};

export default useFilterSelector;
