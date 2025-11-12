const CHECKBOX_CONFIG = [
  { id: "df-recommendation", key: "recommendation" },
  { id: "df-comment", key: "comment" },
];

function syncCheckbox(id, enabled) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  element.checked = Boolean(enabled);
}

function registerCheckbox({ id, key }) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  element.addEventListener("change", () => {
    chrome.storage.local.set({ [key]: element.checked });
  });
}

CHECKBOX_CONFIG.forEach(registerCheckbox);

chrome.storage.local.get(
  CHECKBOX_CONFIG.map((config) => config.key),
  (storedValues) => {
    CHECKBOX_CONFIG.forEach((config) => {
      syncCheckbox(config.id, storedValues[config.key]);
    });
  },
);

