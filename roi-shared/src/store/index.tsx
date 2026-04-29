// @ts-nocheck
"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import rootReducer, { rootInitialState } from "./reducers";

const StoreStateContext = createContext(rootInitialState);
const StoreDispatchContext = createContext(() => {});

const StoreProvider = ({ children }) => {
  const [state, baseDispatch] = useReducer(rootReducer, rootInitialState);
  const stateRef = React.useRef(state);
  stateRef.current = state;

  const dispatch = useMemo(
    () => async (action) => {
      if (typeof action === "function") {
        return action(dispatch, () => stateRef.current);
      }
      return baseDispatch(action);
    },
    []
  );

  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>{children}</StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};

const useStoreState = () => useContext(StoreStateContext);
const useStoreDispatch = () => useContext(StoreDispatchContext);

export { StoreProvider, useStoreState, useStoreDispatch };
