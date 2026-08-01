interface SessionClientInput {
  deviceName?: string;
  platform?: string;
  browser?: string;
  userAgentSummary?: string;
}

export interface SessionClientDescription {
  device: string;
  environment: string;
}

function compactVersion(version: string | undefined): string | undefined {
  if (!version) return undefined;
  const parts = version.replaceAll("_", ".").split(".").slice(0, 2);
  if (parts.length > 1 && parts.at(-1) === "0") parts.pop();
  return parts.join(".");
}

function versionedLabel(label: string, version: string | undefined) {
  const compact = compactVersion(version);
  return compact ? `${label} ${compact}` : label;
}

export function describeSessionClient(
  session: SessionClientInput,
): SessionClientDescription {
  const userAgent = session.userAgentSummary ?? "";
  const android = userAgent.match(/Android\s+([^;)]+)/i);
  const androidModel = userAgent.match(/Android\s+[^;)]+;\s*([^;)]+)/i);
  const ios = userAgent.match(/(?:CPU(?: iPhone)? OS|iPhone OS)\s+([\d_]+)/i);
  const macOs = userAgent.match(/Mac OS X\s+([\d_]+)/i);
  const chromeOs = userAgent.match(/CrOS\s+[^\s]+\s+([\d.]+)/i);
  const windows = userAgent.match(/Windows NT\s+([\d.]+)/i);

  let parsedDevice: string | undefined;
  let parsedPlatform: string | undefined;

  if (android) {
    const model = androidModel?.[1]
      ?.replace(/\s+Build\/.*$/i, "")
      .replace(/;\s*wv$/i, "")
      .trim();
    parsedDevice = model && !/^[a-z]{2}(?:-[a-z]{2})?$/i.test(model)
      ? model
      : "Android device";
    parsedPlatform = versionedLabel("Android", android[1]);
  } else if (/iPad/i.test(userAgent)) {
    parsedDevice = "iPad";
    parsedPlatform = versionedLabel("iPadOS", ios?.[1]);
  } else if (/iPhone|iPod/i.test(userAgent)) {
    parsedDevice = /iPod/i.test(userAgent) ? "iPod" : "iPhone";
    parsedPlatform = versionedLabel("iOS", ios?.[1]);
  } else if (chromeOs) {
    parsedDevice = "Chromebook";
    parsedPlatform = versionedLabel("ChromeOS", chromeOs[1]);
  } else if (windows) {
    const windowsNames: Record<string, string> = {
      "10.0": "Windows 10 or 11",
      "6.3": "Windows 8.1",
      "6.2": "Windows 8",
      "6.1": "Windows 7",
    };
    parsedDevice = "Windows PC";
    parsedPlatform = windowsNames[windows[1] ?? ""] ?? "Windows";
  } else if (/Macintosh/i.test(userAgent)) {
    parsedDevice = "Mac";
    parsedPlatform = versionedLabel("macOS", macOs?.[1]);
  } else if (/Linux/i.test(userAgent)) {
    parsedDevice = "Linux device";
    parsedPlatform = "Linux";
  }

  const browserMatchers: Array<[string, RegExp]> = [
    ["Samsung Internet", /SamsungBrowser\/([\d.]+)/i],
    ["Microsoft Edge", /(?:EdgA|EdgiOS|Edg)\/([\d.]+)/i],
    ["Opera", /(?:OPR|Opera)\/([\d.]+)/i],
    ["Chrome", /(?:Chrome|CriOS)\/([\d.]+)/i],
    ["Firefox", /(?:Firefox|FxiOS)\/([\d.]+)/i],
  ];
  const browserMatch = browserMatchers
    .map(([name, pattern]) => ({ match: userAgent.match(pattern), name }))
    .find(({ match }) => Boolean(match));
  const safariVersion = userAgent.match(/Version\/([\d.]+).*Safari/i);
  const parsedBrowser = browserMatch
    ? versionedLabel(browserMatch.name, browserMatch.match?.[1])
    : safariVersion
      ? versionedLabel("Safari", safariVersion[1])
      : undefined;

  const browser = session.browser || parsedBrowser;
  const platform = session.platform || parsedPlatform;

  return {
    device: session.deviceName || parsedDevice || "Unknown device",
    environment:
      [browser, platform].filter(Boolean).join(" · ") ||
      "Browser details unavailable",
  };
}
