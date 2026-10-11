# FocusGate Kids — Anti-Brainrot Chrome Extension (Manifest V3)

A scheduled website blocker for children and teenagers equipped with a **Wildcard URL Pattern Matching Engine** to automatically block sub-paths like `/shorts`, `/live`, or `/feed` when their parent domain is blocked.

## How to Install in Google Chrome on your Child's Computer:

1. **Unpack this ZIP file** to a local folder (e.g. `Documents/FocusGateKids`).
2. Open Google Chrome on your child's laptop / desktop and go to:
   ```
   chrome://extensions
   ```
3. In the top-right corner, toggle **Developer mode** to ON.
4. Click the **"Load unpacked"** button in the top-left toolbar.
5. Select the folder containing these files (where `manifest.json` resides).
6. **FocusGate Kids** is now active! 

## Key Features for Parents:
- **Wildcard URL Pattern Matching Engine**: Blocking `youtube.com` automatically blocks all sub-paths (`/shorts`, `/live`, `/feed`, etc.).
- **Parent PIN Protection**: Children cannot disable or turn off the extension without your 4-digit PIN (Default: `1234`).
- **Triple-Layer Interception**: Intercepts direct URL typing, YouTube SPA (pushState/yt-navigate-start) transitions, and background tab navigations.
- **Child-Friendly Block Screen**: Encourages creative offline activities (books, Lego, drawing, outside play) instead of cold error screens.
- **Full Graphical Options Dashboard**: Click "Open Full Parent Dashboard" in the Chrome extension to open the complete visual overview, schedule planner, and website toggles!

## 2.3.2 blocking fix
- Content-script blocking now respects each schedule's `appliedCategories`.
- The default `test` schedule includes the `custom` category so manually-added URLs are blocked from 18:00–19:00 on weekdays.
- Dynamic blocking rules are recreated on Chrome startup.
- Dynamic blocking rules refresh immediately when extension configuration changes.
- DNR URL filters normalize wildcard/custom host patterns before creating Chrome rules.
- Date overrides use the browser's local date instead of UTC date.

## v2.3.5 - Daily active-use quotas
- Added per-category daily usage quotas for Short video, Social, Gaming, Long video, and Custom sites.
- Usage is counted only when a matching site is otherwise allowed, the tab is visible/active, and its Chrome window is focused.
- Background tabs do not consume quota.
- When a quota is reached, that category is blocked for the rest of the local calendar day.
- Parent dashboard shows used/remaining time and allows enabling/disabling limits, changing minutes, and resetting today's counters.
- Existing installations are migrated automatically with quotas disabled by default.

## v2.3.6 - Grace-period warnings
- Configurable warning period (default: 5 minutes, 1-30 minutes).
- Shows a countdown banner on an active protected site before a scheduled block begins.
- Shows an advance warning when a category is approaching its daily usage quota.
- The warning is informational only; the normal schedule/quota still enforces at the cutoff.

## v2.3.8 — English / French interface
- Added persistent language setting (`settings.language`: `en` or `fr`).
- Language selector in Parent Dashboard and popup.
- Translates dashboard controls, schedules, quotas, blocked page, PIN messages, and grace-period warnings.
- Language changes are applied after reload and persist across Chrome restarts.


## v2.4.1 — Block-page themes
- Added two parent-selectable block-page themes: **Calm** (default) and **Playful**.
- Both themes keep the existing message, alternative activities, Back action, and Parent PIN override.
- Themes use a soft blue/violet identity, solid backgrounds, no characters or illustrations, and are designed for ages 6–10 without looking childish.
- Theme choice is stored in `settings.blockPageTheme` and follows the existing English/French interface.
