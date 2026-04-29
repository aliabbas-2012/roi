// @ts-nocheck

const SESSION_KEY = "roi_mock_session";
const TOKEN_KEY = "roi_mock_token";
const USERS_KEY = "roi_mock_users";

const defaultUsers = [
  {
    id: "ADM-1001",
    role: "admin",
    firstName: "Admin",
    lastName: "User",
    name: "Admin User",
    email: "admin@roi.com",
    countryCode: "+1",
    phoneNumber: "1111111111",
    password: "Admin@123",
  },
  {
    id: "CLI-1001",
    role: "client",
    firstName: "Client",
    lastName: "User",
    name: "Client User",
    email: "client@roi.com",
    countryCode: "+92",
    phoneNumber: "3001234567",
    password: "Client@123",
  },
];

const canUseStorage = () => typeof window !== "undefined";

const readUsers = () => {
  if (!canUseStorage()) return defaultUsers;
  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) return defaultUsers;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : defaultUsers;
  } catch {
    return defaultUsers;
  }
};

const writeUsers = (users) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const buildSession = (user) => ({
  token: `${user.role}-${Date.now()}`,
  user: {
    id: user.id,
    role: user.role,
    name: user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    email: user.email,
    countryCode: user.countryCode,
    phoneNumber: user.phoneNumber,
  },
});

export const setSession = (session) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(TOKEN_KEY, session.token);
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = () => {
  if (!canUseStorage()) return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearSession = () => {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(SESSION_KEY);
};

export const mockLogin = async ({ email, password, role }) => {
  const users = readUsers();
  const user = users.find(
    (item) =>
      item.email.toLowerCase() === String(email || "").toLowerCase() &&
      item.password === password &&
      item.role === role
  );

  if (!user) {
    throw new Error("Invalid credentials for selected account type.");
  }

  const session = buildSession(user);
  setSession(session);
  return session;
};

export const mockRegisterClient = async ({ firstName, lastName, email, countryCode, phoneNumber, password }) => {
  const users = readUsers();
  const trimmedFirstName = String(firstName || "").trim();
  const trimmedLastName = String(lastName || "").trim();
  const trimmedEmail = String(email || "").trim().toLowerCase();
  const trimmedCountryCode = String(countryCode || "").trim();
  const trimmedPhoneNumber = String(phoneNumber || "").trim();
  const passwordValue = String(password || "");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z][A-Za-z\s'-]{1,39}$/;
  const phoneRegex = /^\d{7,14}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  if (!nameRegex.test(trimmedFirstName)) {
    throw new Error("Invalid first name.");
  }
  if (!nameRegex.test(trimmedLastName)) {
    throw new Error("Invalid last name.");
  }
  if (!emailRegex.test(trimmedEmail)) {
    throw new Error("Invalid email.");
  }
  if (!trimmedCountryCode.startsWith("+")) {
    throw new Error("Invalid country code.");
  }
  if (!phoneRegex.test(trimmedPhoneNumber)) {
    throw new Error("Invalid phone number.");
  }
  if (!passwordRegex.test(passwordValue)) {
    throw new Error("Password does not meet complexity requirements.");
  }

  const exists = users.some((item) => item.email.toLowerCase() === trimmedEmail);

  if (exists) {
    throw new Error("Email already exists.");
  }

  const createdUser = {
    id: `CLI-${1000 + users.length + 1}`,
    role: "client",
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    name: `${trimmedFirstName} ${trimmedLastName}`.trim(),
    email: trimmedEmail,
    countryCode: trimmedCountryCode,
    phoneNumber: trimmedPhoneNumber,
    password: passwordValue,
  };

  const nextUsers = [...users, createdUser];
  writeUsers(nextUsers);

  const session = buildSession(createdUser);
  setSession(session);
  return session;
};
