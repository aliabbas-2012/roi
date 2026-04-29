// @ts-nocheck
import { clearSession, getSession, mockLogin, mockRegisterClient } from "./mockAuth";

export const apiClient = {
  async get(path, options = {}) {
    if (path === "/auth/session") {
      return Promise.resolve({ path, method: "GET", options, data: getSession() });
    }
    if (path === "/dashboard/summary") {
      const role = getSession()?.user?.role || "client";
      const data =
        role === "admin"
          ? {
              totalLabel: "Total Revenue",
              totalValue: "$0",
              totalDelta: "+0.0% from last week",
              cards: [
                { label: "Users", value: "0" },
                { label: "Packages", value: "0" },
                { label: "Today Sales", value: "$0" },
              ],
            }
          : {
              totalLabel: "Total Balance",
              totalValue: "$0",
              totalDelta: "+0.0% from last week",
              cards: [
                { label: "Today Profit", value: "$0" },
                { label: "Yesterday Profit", value: "$0" },
                { label: "This Week Profit", value: "$0" },
              ],
            };
      return Promise.resolve({ path, method: "GET", options, data });
    }
    return Promise.resolve({ path, method: "GET", options, data: [] });
  },
  async post(path, body = {}, options = {}) {
    if (path === "/auth/login") {
      const data = await mockLogin(body);
      return Promise.resolve({ path, method: "POST", options, body, data });
    }

    if (path === "/auth/register/client") {
      const data = await mockRegisterClient(body);
      return Promise.resolve({ path, method: "POST", options, body, data });
    }

    if (path === "/auth/logout") {
      clearSession();
      return Promise.resolve({ path, method: "POST", options, body, data: { success: true } });
    }

    return Promise.resolve({ path, method: "POST", options, body });
  },
  async patch(path, body = {}, options = {}) {
    return Promise.resolve({ path, method: "PATCH", options, body });
  },
  async delete(path, options = {}) {
    return Promise.resolve({ path, method: "DELETE", options });
  },
};
