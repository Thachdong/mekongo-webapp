export const PAGES = {
  HOME: { pathname: "/", title: "Home" },
  LOGIN: { pathname: "/auth/login", title: "Login" },
  REGISTER: { pathname: "/auth/register", title: "Register" },
  ACTIVATE: { pathname: "/auth/activate", title: "Activate" },
  RESET_PASSWORD: { pathname: "/auth/reset-password", title: "Reset Password" },
  CHANGE_PASSWORD: { pathname: "/auth/change-password", title: "Change Password" },
  PROFILE: { pathname: "/profile", title: "Profile" },
} as const;
