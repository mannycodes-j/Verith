import { apiClient } from "./apiClient";
import type { MilGrowthProfile } from "@/types/mil";

export const milService = {
  profile: () => apiClient.get<MilGrowthProfile>("/mil/profile"),
};

