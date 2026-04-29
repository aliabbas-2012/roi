// @ts-nocheck
import authReducer, { initialState as authInitial } from "./authReducer";
import dashboardReducer, { initialState as dashboardInitial } from "./dashboardReducer";

const rootInitialState = {
  auth: authInitial,
  dashboard: dashboardInitial,
};

const rootReducer = (state = rootInitialState, action) => ({
  auth: authReducer(state.auth, action),
  dashboard: dashboardReducer(state.dashboard, action),
});

export { rootInitialState };
export default rootReducer;
