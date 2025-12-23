/**
 * Constants and Type Definitions
 */

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_NOT_FOUND: "User not found",
  EMAIL_NOT_CONFIRMED: "Please confirm your email before logging in",
  PASSWORD_MISMATCH: "Passwords do not match",
  EMAIL_ALREADY_EXISTS: "This email is already registered",
  SESSION_EXPIRED: "Your session has expired",
} as const

export const SUCCESS_MESSAGES = {
  EMAIL_SENT: "Check your email for a confirmation link",
  EMAIL_CONFIRMED: "Email confirmed successfully! You can now log in.",
  PASSWORD_RESET_SENT: "Password reset link sent to your email",
  PASSWORD_CHANGED: "Password changed successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  USER_CREATED: "User created successfully",
} as const

export const ROUTES = {
  // Public
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  PORTFOLIO: "/work",
  BLOG: "/blog",
  CONTACT: "/contact",
  QUOTE: "/quote",

  // Auth
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  CALLBACK: "/auth/callback",
  RESET_PASSWORD: "/auth/reset-password",

  // Dashboard
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",
  PROFILE: "/dashboard/profile",

  // Admin Routes
  ADMIN_USERS: "/admin/users",
  ADMIN_STATS: "/admin/stats",
  ADMIN_SETTINGS: "/admin/settings",
} as const

export type AuthError = (typeof AUTH_ERRORS)[keyof typeof AUTH_ERRORS]
export type SuccessMessage = (typeof SUCCESS_MESSAGES)[keyof typeof SUCCESS_MESSAGES]
