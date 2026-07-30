"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import {
  whatsappService,
  type WhatsAppLinkCode,
} from "@/services/whatsapp";
import { whatsappSettingsStyles as styles } from "./whatsapp-settings.styles";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Unavailable"
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "medium",
      }).format(date);
}

export default function WhatsAppSettings() {
  const queryClient = useQueryClient();
  const [code, setCode] = useState<WhatsAppLinkCode>();
  const [unlinkDialog, setUnlinkDialog] = useState(false);
  const status = useQuery({
    queryFn: whatsappService.status,
    queryKey: ["whatsapp-link-status"],
    refetchInterval: code ? 5000 : false,
  });
  const createCode = useMutation({
    mutationFn: whatsappService.createCode,
    onSuccess: setCode,
  });
  const unlink = useMutation({
    mutationFn: whatsappService.unlink,
    onSuccess: async () => {
      setUnlinkDialog(false);
      setCode(undefined);
      await queryClient.invalidateQueries({
        queryKey: ["whatsapp-link-status"],
      });
    },
  });
  const linked = status.data?.linked === true;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>Account / WhatsApp</span>
        <h1>WhatsApp linking.</h1>
        <p>
          Connect a WhatsApp number without exposing it in this interface.
          Verith stores the number encrypted and uses a hashed lookup.
        </p>
      </header>
      <nav className={styles.settingsNav} aria-label="Settings sections">
        <Link href="/app/settings">Profile</Link>
        <Link href="/app/settings/privacy">Privacy and data</Link>
        <Link href="/app/settings/security">Password and sessions</Link>
        <span>WhatsApp</span>
      </nav>

      {status.isPending && <p>Checking WhatsApp link status…</p>}
      {status.isError && (
        <section className={styles.error} role="alert">
          <span>Status unavailable</span>
          <p>{status.error.message}</p>
          <button type="button" onClick={() => void status.refetch()}>
            Retry
          </button>
        </section>
      )}
      {status.data && (
        <section className={styles.status} data-linked={linked}>
          <div>
            <span>{linked ? "Linked" : "Not linked"}</span>
            <h2>
              {linked
                ? "WhatsApp verification is available."
                : "Connect WhatsApp to submit forwarded content."}
            </h2>
          </div>
          {linked ? (
            <button
              className={styles.danger}
              onClick={() => setUnlinkDialog(true)}
              type="button"
            >
              Unlink WhatsApp
            </button>
          ) : (
            <button
              disabled={createCode.isPending}
              onClick={() => createCode.mutate()}
              type="button"
            >
              {createCode.isPending
                ? "Generating code…"
                : code
                  ? "Generate another code"
                  : "Generate link code"}
            </button>
          )}
        </section>
      )}
      {createCode.isError && (
        <p className={styles.errorMessage} role="alert">
          {createCode.error.message}
        </p>
      )}
      {code && !linked && (
        <section className={styles.code}>
          <span>One-time link code</span>
          <strong>{code.code}</strong>
          <p>{code.instruction}</p>
          <small>Expires {formatDate(code.expiresAt)}</small>
          <p>
            The status above refreshes automatically after WhatsApp consumes
            the code. Do not share this code with another person.
          </p>
        </section>
      )}
      <section className={styles.explainer}>
        <span>How it works</span>
        <ol>
          <li>
            <strong>01</strong>
            Generate a code that expires after ten minutes.
          </li>
          <li>
            <strong>02</strong>
            Send the exact instruction to the configured Verith WhatsApp
            account.
          </li>
          <li>
            <strong>03</strong>
            The signed webhook consumes the code and records your consent.
          </li>
        </ol>
      </section>

      {unlinkDialog && (
        <div
          aria-labelledby="unlink-whatsapp-title"
          aria-modal="true"
          className={styles.backdrop}
          role="dialog"
        >
          <section className={styles.dialog}>
            <span>WhatsApp connection</span>
            <h2 id="unlink-whatsapp-title">Unlink WhatsApp?</h2>
            <p>
              Verith will remove the encrypted phone number and disable future
              linked submissions until you connect again.
            </p>
            {unlink.isError && (
              <p className={styles.errorMessage} role="alert">
                {unlink.error.message}
              </p>
            )}
            <footer>
              <button
                disabled={unlink.isPending}
                onClick={() => setUnlinkDialog(false)}
                type="button"
              >
                Keep linked
              </button>
              <button
                className={styles.danger}
                disabled={unlink.isPending}
                onClick={() => unlink.mutate()}
                type="button"
              >
                {unlink.isPending ? "Unlinking…" : "Unlink WhatsApp"}
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
