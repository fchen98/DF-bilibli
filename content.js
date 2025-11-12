const BANNER_SELECTOR = ".bili-banner";
const WALL_CLASS = "bili-wall";
const WALL_MARKER_CLASS = "df-bili-wall";
const WALL_IMAGE_URL = "https://raw.githubusercontent.com/fchen98/DF-bilibli/main/Bilibili_logo_bar.png";
const WALL_CLONE_COUNT = 4;

function createWallElement(sourceBanner) {
  const wall = sourceBanner.cloneNode(true);
  wall.classList.add(WALL_CLASS, WALL_MARKER_CLASS);
  wall.style.backgroundImage = `url("${WALL_IMAGE_URL}")`;
  wall.style.backgroundColor = "white";

  const taper = wall.querySelector(".taper-line");
  if (taper) {
    taper.remove();
  }

  return wall;
}

function injectWall() {
  const banner = document.querySelector(BANNER_SELECTOR);
  if (!banner) {
    return false;
  }

  const parent = banner.parentElement;
  const outerContainer = parent?.parentElement;
  if (!parent || !outerContainer) {
    return true;
  }

  const alreadyInjected = outerContainer.querySelector(`.${WALL_MARKER_CLASS}`);
  if (alreadyInjected) {
    return true;
  }

  const wall = createWallElement(banner);
  parent.appendChild(wall);

  for (let index = 0; index < WALL_CLONE_COUNT; index += 1) {
    outerContainer.appendChild(createWallElement(banner));
  }

  return true;
}

function ensureWall() {
  if (injectWall()) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (injectWall()) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ensureWall);
} else {
  ensureWall();
}

