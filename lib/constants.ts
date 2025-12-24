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

export const ROLES = {
  CEO: "ceo",
  ADMIN: "admin",
  WORKER: "worker",
  CLIENT: "client",
} as const

export type RoleType = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_PERMISSIONS: Record<RoleType, Record<string, boolean>> = {
  ceo: {
    // CEO has absolute power, cannot be locked out
    canAccessAdmin: true,
    canManageUsers: true,
    canManageWorkers: true,
    canManageClients: true,
    canAssignRoles: true,
    canViewAnalytics: true,
    canViewAuditLogs: true,
    canAccessClientDashboard: true,
    canInviteClients: true,
    canViewAllData: true,
  },
  admin: {
    // Admins can do most things except change CEO or manage other admins
    canAccessAdmin: true,
    canManageUsers: true,
    canManageWorkers: true,
    canManageClients: true,
    canAssignRoles: false,
    canViewAnalytics: true,
    canViewAuditLogs: true,
    canAccessClientDashboard: true,
    canInviteClients: true,
    canViewAllData: true,
  },
  worker: {
    // Workers can manage assigned clients and invite new ones
    canAccessAdmin: false,
    canManageUsers: false,
    canManageWorkers: false,
    canManageClients: true, // Can manage assigned clients
    canAssignRoles: false,
    canViewAnalytics: false,
    canViewAuditLogs: false,
    canAccessClientDashboard: true,
    canInviteClients: true, // Can invite new clients
    canViewAllData: false,
  },
  client: {
    // Clients have limited access to their own data
    canAccessAdmin: false,
    canManageUsers: false,
    canManageWorkers: false,
    canManageClients: false,
    canAssignRoles: false,
    canViewAnalytics: false,
    canViewAuditLogs: false,
    canAccessClientDashboard: true,
    canInviteClients: false,
    canViewAllData: false,
  },
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
  ADMIN_USERS: "/admin/users",
  WORKER: "/dashboard/worker",
  PROFILE: "/dashboard/profile",
} as const

export type AuthError = (typeof AUTH_ERRORS)[keyof typeof AUTH_ERRORS]
export type SuccessMessage = (typeof SUCCESS_MESSAGES)[keyof typeof SUCCESS_MESSAGES]
