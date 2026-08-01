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
  authProvider?: "LOCAL" | "GOOGLE";
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

export type GoogleAuthIntent = "LOGIN" | "REGISTER";

export interface GoogleAuthConfiguration {
  enabled: boolean;
  clientId: string | null;
}

export const authService = {
  async forgotPassword(email: string): Promise<void> {
    await apiClient.postVoid(
      "/auth/forgot-password",
      { email },
      { retryAuthentication: false },
    );
  },

  getCurrentUser(): Promise<AuthenticatedUser> {
    return apiClient.get<AuthenticatedUser>("/auth/me");
  },

  getProfile(): Promise<AuthenticatedUser> {
    return apiClient.get<AuthenticatedUser>("/users/me");
  },

  googleConfiguration(): Promise<GoogleAuthConfiguration> {
    return apiClient.get<GoogleAuthConfiguration>("/auth/google/config", {
      retryAuthentication: false,
    });
  },

  async googleAuthenticate(
    credential: string,
    intent: GoogleAuthIntent,
  ): Promise<AuthenticationResult> {
    const result = await apiClient.post<AuthenticationResult>(
      "/auth/google",
      { credential, intent },
      { retryAuthentication: false },
    );
    sessionToken.set(result.accessToken);
    return result;
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
      await apiClient.postVoid("/auth/logout");
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
    return apiClient.postVoid(
      "/auth/resend-verification",
      { email },
      { retryAuthentication: false },
    );
  },

  resetPassword(input: ResetPasswordInput): Promise<void> {
    return apiClient.postVoid("/auth/reset-password", input, {
      retryAuthentication: false,
    });
  },

  verifyEmail(token: string): Promise<void> {
    return apiClient.postVoid(
      "/auth/verify-email",
      { token },
      { retryAuthentication: false },
    );
  },
};
