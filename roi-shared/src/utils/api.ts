// @ts-nocheck
export const apiClient = {
  async get(path, options = {}) {
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
