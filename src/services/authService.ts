import type { components } from "@/generated/api-schema";
import { apiClient, sessionToken } from "./apiClient";

export type LoginInput = components["schemas"]["LoginDto"];
export type RegisterInput = components["schemas"]["RegisterDto"];
export type ResetPasswordInput = components["schemas"]["ResetPasswordDto"];

export interface AuthenticatedUser {
  id?: string;
  userId?: string;
  email?: string;
  username?: string;
  displayName?: string;
  role?: string;
  status?: string;
  [key: string]: unknown;
}

interface AuthenticationResult {
  accessToken: string;
  accessTokenExpiresIn: string;
  user: AuthenticatedUser;
}

interface RegistrationResult {
  user: AuthenticatedUser;
  emailDelivery: {
    state: "OPERATIONAL" | "NOT_CONFIGURED" | "UNAVAILABLE";
    messageId?: string;
    failureCode?: string;
  };
}

export const authService = {
  async forgotPassword(email: string): Promise<void> {
    await apiClient.post<void>("/auth/forgot-password", { email });
  },

  getCurrentUser(): Promise<AuthenticatedUser> {
    return apiClient.get<AuthenticatedUser>("/auth/me");
  },

  getProfile(): Promise<AuthenticatedUser> {
    return apiClient.get<AuthenticatedUser>("/users/me");
  },

  async login(input: LoginInput): Promise<AuthenticationResult> {
    const result = await apiClient.post<AuthenticationResult>(
      "/auth/login",
      input,
      { retryAuthentication: false },
    );
    sessionToken.set(result.accessToken);
    return result;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post<void>("/auth/logout");
    } finally {
      sessionToken.clear();
    }
  },

  register(input: RegisterInput): Promise<RegistrationResult> {
    return apiClient.post<RegistrationResult>("/auth/register", input, {
      retryAuthentication: false,
    });
  },

  resendVerification(email: string): Promise<void> {
    return apiClient.post<void>(
      "/auth/resend-verification",
      { email },
      { retryAuthentication: false },
    );
  },

  resetPassword(input: ResetPasswordInput): Promise<void> {
    return apiClient.post<void>("/auth/reset-password", input, {
      retryAuthentication: false,
    });
  },

  verifyEmail(token: string): Promise<void> {
    return apiClient.post<void>(
      "/auth/verify-email",
      { token },
      { retryAuthentication: false },
    );
  },
};
