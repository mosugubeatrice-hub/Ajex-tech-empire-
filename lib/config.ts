/**
 * Centralized Configuration for AJEx Tech Empire
 * This file contains all business info, feature flags, and configuration constants
 * Update this file to configure the entire platform
 */

export const BUSINESS_CONFIG = {
  name: "AJEx Tech Empire",
  tagline: "Premium Digital Growth Agency",
  founder: "Isaac Ajeh",
  description: "Transform your digital presence into your most powerful growth engine",

  // Email Configuration
  email: {
    primary: "ajexlink@gmail.com",
    support: "support@ajextechempire.com",
    noreply: "noreply@ajextechempire.com",
    notifications: "notifications@ajextechempire.com",
  },

  // Brand Configuration
  brand: {
    tone: ["Professional", "Startup", "Futuristic", "Premium"],
    colors: {
      primary: "#3b82f6", // Blue
      secondary: "#06b6d4", // Cyan
      accent: "#8b5cf6", // Purple
      dark: "#0f172a", // Dark Blue
      light: "#f8fafc", // Light
    },
  },

  // Authentication Configuration
  auth: {
    emailVerificationRequired: false, // Disable email verification requirement for immediate signup
    allowClientSignup: true,
    allowTeamSignup: true,
    redirectAfterConfirm: "/dashboard",
    sessionDuration: 7 * 24 * 60 * 60, // 7 days in seconds
  },

  // Admin Configuration
  admin: {
    multipleAdminsAllowed: true,
    notifyOnSignup: true,
    notifyOnEmailConfirm: true,
    notifyOnContactSubmission: true,
  },

  // Email Features
  emailFeatures: {
    signupConfirmation: true,
    passwordReset: true,
    welcomeEmail: true,
    adminNotifications: true,
    transactionalEmails: true,
  },

  // Feature Flags for Future Expansion
  features: {
    payments: false, // Enable when payment processing is ready
    subscriptions: false,
    orders: false,
    invoices: false,
    aiTools: false, // Enable when AI features are integrated
    chatbot: false,
    analytics: false,
    multiTenant: false,
  },

  // Social Media & Contact
  social: {
    twitter: "https://twitter.com/ajextechempire",
    linkedin: "https://linkedin.com/company/ajextechempire",
    github: "https://github.com/ajextechempire",
    instagram: "https://instagram.com/ajextechempire",
  },

  // SEO Configuration
  seo: {
    domain: "https://ajextechempire.com",
    ogImage: "/og-image.jpg",
    twitterHandle: "@ajextechempire",
  },

  // URLs (no physical location, all online)
  urls: {
    website: "https://ajextechempire.com",
    api: "https://api.ajextechempire.com",
    docs: "https://docs.ajextechempire.com",
    support: "https://support.ajextechempire.com",
  },
}

export const USER_ROLES = {
  ADMIN: "admin",
  CLIENT: "client",
  STAFF: "staff", // Future: internal team members
} as const

export const ROLE_PERMISSIONS = {
  admin: {
    canViewAllUsers: true,
    canManageUsers: true,
    canViewStats: true,
    canAccessAdminPanel: true,
    canManageContent: true,
    canViewAuditLogs: true,
  },
  client: {
    canViewAllUsers: false,
    canManageUsers: false,
    canViewStats: false,
    canAccessAdminPanel: false,
    canManageContent: false,
    canViewAuditLogs: false,
  },
  staff: {
    canViewAllUsers: false,
    canManageUsers: false,
    canViewStats: true,
    canAccessAdminPanel: false,
    canManageContent: true,
    canViewAuditLogs: false,
  },
} as const

export const FEATURE_FLAGS = {
  // Enable/disable features without code changes
  paymentProcessing: BUSINESS_CONFIG.features.payments,
  subscriptionsEnabled: BUSINESS_CONFIG.features.subscriptions,
  ordersEnabled: BUSINESS_CONFIG.features.orders,
  aiToolsEnabled: BUSINESS_CONFIG.features.aiTools,
  analyticsEnabled: BUSINESS_CONFIG.features.analytics,
  multiTenantEnabled: BUSINESS_CONFIG.features.multiTenant,
}
