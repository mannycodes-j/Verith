import { VERIFICATION_STAGE_GROUPS } from "@/data/verification";
import type { VerificationRecord } from "@/services/verification";

export function currentVerificationStageIndex(record: VerificationRecord) {
  const index = VERIFICATION_STAGE_GROUPS.findIndex((group) =>
    group.stages.some((stage) => stage === record.currentStage),
  );
  return Math.max(index, 0);
}

export function formatVerificationTimestamp(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "medium" }).format(new Date(value));
}
