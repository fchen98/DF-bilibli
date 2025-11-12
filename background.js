const BILIBILI_HOST_PATTERN = /https?:\/\/(?:[^\/]+\.)?bilibili\.com\//i;
const HOST_URL_PATTERNS = [
  "*://t.bilibili.com/*",
  "*://www.bilibili.com/*",
  "*://space.bilibili.com/*",
  "*://search.bilibili.com/*",
];
const STORAGE_DEFAULTS = {
  recommendation: false,
  comment: false,
};
const CSS_FILES = {
  recommendation: "css/recommendation.css",
  comment: "css/comment.css",
  wall: "css/wall.css",
};

async function getPreferences() {
  const stored = await chrome.storage.local.get(STORAGE_DEFAULTS);
  return { ...STORAGE_DEFAULTS, ...stored };
}

async function toggleCss(tabId, file, enable) {
  const action = enable ? chrome.scripting.insertCSS : chrome.scripting.removeCSS;
  try {
    await action({
      files: [file],
      target: { tabId },
    });
  } catch (error) {
    // Ignore errors caused by tabs that are no longer available or CSS that was not injected yet.
    if (error?.message?.includes("no tab with id")) {
      return;
    }
    console.warn(`Failed to ${enable ? "insert" : "remove"} CSS ${file} for tab ${tabId}`, error);
  }
}

async function applyPreferencesToTab(tabId, url) {
  if (!url || !BILIBILI_HOST_PATTERN.test(url)) {
    return;
  }

  const { recommendation, comment } = await getPreferences();

  await toggleCss(tabId, CSS_FILES.recommendation, recommendation);
  await toggleCss(tabId, CSS_FILES.wall, !recommendation);
  await toggleCss(tabId, CSS_FILES.comment, comment);
}

async function applyPreferencesToAllTabs() {
  const tabs = await chrome.tabs.query({ url: HOST_URL_PATTERNS });
  await Promise.all(tabs.map((tab) => applyPreferencesToTab(tab.id, tab.url)));
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set(STORAGE_DEFAULTS, () => {
    applyPreferencesToAllTabs();
  });
});

chrome.runtime.onStartup.addListener(() => {
  applyPreferencesToAllTabs();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    applyPreferencesToTab(tabId, tab.url);
  }
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local") {
    return;
  }

  const hasRelevantChange = "recommendation" in changes || "comment" in changes;
  if (!hasRelevantChange) {
    return;
  }

  applyPreferencesToAllTabs();
});

