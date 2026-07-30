"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { adminService } from "@/services/admin";
import { adminStyles as styles } from "../../admin.styles";

const providers = ["GROQ", "OPENROUTER", "GEMINI"];

export default function ProviderConfiguration() {
  const client = useQueryClient();
  const query = useQuery({
    queryFn: adminService.providerConfiguration,
    queryKey: ["admin", "ai", "providers"],
    retry: false,
  });
  const [enabledOverride, setEnabled] = useState<string[] | null>(null);
  const [orderOverride, setOrder] = useState<string[] | null>(null);
  const [reason, setReason] = useState("");
  const enabled = enabledOverride ?? query.data?.enabledProviders ?? [];
  const order = orderOverride ?? query.data?.defaultOrder ?? [];

  const update = useMutation({
    mutationFn: () =>
      adminService.updateProviderConfiguration(enabled, order, reason),
    onSuccess: async () => {
      setReason("");
      await client.invalidateQueries({
        queryKey: ["admin", "ai", "providers"],
      });
    },
  });

  if (query.isPending)
    return <div className={styles.loading}>Loading provider policy…</div>;
  if (query.isError)
    return (
      <section className={styles.error} role="alert">
        <span>Provider policy unavailable</span>
        <h1>The runtime configuration could not be opened.</h1>
        <p>{query.error.message}</p>
      </section>
    );

  return (
    <div className={styles.page}>
      <header className={styles.listHero}>
        <div>
          <span>AI governance / Runtime</span>
          <h1>Provider configuration.</h1>
        </div>
        <p>
          This policy controls provider eligibility and fallback order. API
          keys and other secrets are never returned or mutated here.
        </p>
      </header>
      <section className={styles.actionSection}>
        <span>Enabled providers</span>
        <div className={styles.providerGrid}>
          {providers.map((provider) => (
            <label key={provider}>
              <input
                checked={enabled.includes(provider)}
                onChange={(event) =>
                  setEnabled(
                    event.target.checked
                      ? [...new Set([...enabled, provider])]
                      : enabled.filter((item) => item !== provider),
                  )
                }
                type="checkbox"
              />
              {provider}
            </label>
          ))}
        </div>
        <label>
          Fallback order
          <select
            value={order.join(",")}
            onChange={(event) => setOrder(event.target.value.split(","))}
          >
            <option value="GROQ,OPENROUTER,GEMINI">
              Groq → OpenRouter → Gemini
            </option>
            <option value="OPENROUTER,GEMINI,GROQ">
              OpenRouter → Gemini → Groq
            </option>
            <option value="GEMINI,OPENROUTER,GROQ">
              Gemini → OpenRouter → Groq
            </option>
          </select>
        </label>
        <label>
          Audit reason
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
        </label>
        {update.isError && <p role="alert">{update.error.message}</p>}
        <button
          disabled={
            update.isPending || enabled.length === 0 || reason.length < 10
          }
          onClick={() => update.mutate()}
          type="button"
        >
          {update.isPending ? "Saving policy…" : "Save provider policy"}
        </button>
      </section>
    </div>
  );
}
