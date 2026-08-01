import { apiClient } from "./apiClient";

export interface WhatsAppLinkCode {
  code: string;
  expiresAt: string;
  instruction: string;
}

export const whatsappService = {
  createCode: () =>
    apiClient.post<WhatsAppLinkCode>("/whatsapp/link-code"),
  status: () => apiClient.get<{ linked: boolean }>("/whatsapp/link-status"),
  unlink: () => apiClient.deleteVoid("/whatsapp/link"),
};
