// @ts-nocheck
import { getSession } from "./authSession";

export const apiClient = {
  async get(path, options = {}) {
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
    return Promise.resolve({ path, method: "POST", options, body });
  },
  async patch(path, body = {}, options = {}) {
    return Promise.resolve({ path, method: "PATCH", options, body });
  },
  async delete(path, options = {}) {
    return Promise.resolve({ path, method: "DELETE", options });
  },
};
