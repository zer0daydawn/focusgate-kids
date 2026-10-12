# FocusGate Kids

**A smarter way to manage screen time, reduce digital distractions, and encourage healthier browsing habits for children.**

FocusGate Kids is a parental control extension for Google Chrome, built on Manifest V3. It gives parents practical tools to manage when children can access certain websites, how much time they spend on different types of content, and what happens when a browsing restriction is reached.

Rather than simply blocking everything, FocusGate Kids promotes a balanced approach to digital well-being by combining configurable schedules, daily usage limits, parent-approved exceptions, and child-friendly feedback.

The project is particularly focused on reducing exposure to highly engaging content such as endless short-video feeds, social media, and gaming websites during homework, family time, and bedtime.

## Why FocusGate Kids?

Children increasingly encounter websites and platforms designed to maximize engagement through endless scrolling, recommendations, and immediate rewards.

FocusGate Kids helps parents establish predictable boundaries without having to manually supervise every browsing session.

**The goal is not to eliminate screen time, but to make it more intentional, manageable, and appropriate for family routines.**

## Key Features

### Scheduled Website Access

Create flexible browsing schedules based on your family's routine.

- Block selected websites during school hours, homework, or bedtime.
- Define recurring rules for specific days of the week.
- Configure both blocked periods and permitted access windows.
- Apply restrictions to selected website categories.
- Create date-specific exceptions for holidays, special occasions, or family activities.

### Daily Screen Time Quotas

Set daily usage limits for different content categories.

Supported categories include:

- Short-form video platforms
- Social media
- Gaming websites
- Long-form video and streaming
- Custom websites

FocusGate Kids tracks usage locally and restricts access when an enabled category reaches its daily allowance.

### Website and URL Filtering

Manage access to individual websites or more specific sections of a platform.

For example, restrictions can target:

- `youtube.com`
- `youtube.com/shorts`
- `tiktok.com`
- `instagram.com`

Domain and path-based filtering provide greater flexibility than simple website-wide blocking. Subdomains are also supported.

### Child-Friendly Blocking Experience

When a website becomes unavailable, FocusGate Kids displays a dedicated pause screen rather than a generic browser error.

Parents can select between two visual themes:

- **Calm:** A soft, reassuring interface with gentle blue and purple tones.
- **Playful:** A more colorful and engaging experience designed for children.

The blocking page encourages children to move on to another activity and provides a way to request temporary parental authorization.

### Parent PIN Protection

Sensitive configuration changes require parental authentication.

Security controls include:

- PBKDF2-SHA256 PIN derivation with a random salt.
- PIN verification performed by the extension service worker.
- Failed authentication attempt limiting.
- Temporary lockout after repeated incorrect attempts.
- Time-limited authorization for parental dashboard operations.

These controls help prevent casual unauthorized changes but do not make the extension tamper-proof.

### Temporary Parent Access

Parents can grant a temporary **15-minute access pass** after successful PIN authentication.

This is useful for exceptional situations where access is needed without permanently modifying established schedules or restrictions.

Once the temporary authorization expires, the normal restrictions are reapplied.

### Time Change Notifications

FocusGate Kids includes advisory mechanisms that help parents identify possible inconsistencies in the computer's clock.

Two complementary approaches are used:

**Local time change detection — v2.4.4**

Compares system time with a monotonic clock while the extension service worker is running. Significant differences of approximately two minutes or more can generate a notification.

**Internet time verification — v2.4.5**

Periodically checks the computer's reported time against a UTC reference obtained from WorldTimeAPI. Differences greater than five minutes can be reported.

The most recent 20 notifications are retained locally.

These checks are informational. They do not automatically enforce network-based time, and clock discrepancies are not proof of intentional manipulation.

## How It Works

FocusGate Kids uses Chrome Manifest V3 technologies to evaluate browsing restrictions and enforce configured rules.

The extension combines scheduled evaluations, browser navigation controls, declarative network request rules, and local configuration storage.

Parents manage the extension through a dashboard, while children see a simplified pause screen when access is restricted.

The main capabilities are designed to operate locally without requiring a user account or dedicated cloud service.

## Installation

FocusGate Kids is currently intended for manual installation in Google Chrome.

1. Download or clone this GitHub repository.
2. Extract the downloaded ZIP, if applicable, into a permanent folder.
3. Open `chrome://extensions` in Google Chrome.
4. Enable **Developer mode**.
5. Select **Load unpacked**.
6. Choose the folder containing `manifest.json`.
7. Confirm that the extension appears in Chrome.

The repository currently declares version **2.4.5** in its manifest.

### Initial Configuration

After installation:

1. Open the FocusGate Kids parental dashboard.
2. Change the default parental PIN immediately.
3. Review the predefined website categories and example schedules.
4. Customize permitted browsing periods and daily quotas.
5. Select your preferred blocking screen theme.
6. Test restrictions and temporary parental access.

The initial PIN in the current project configuration is `1234`. It must be changed before relying on parental restrictions.

### Updating the Extension

When updating an existing unpacked installation, replace the extension files in the original folder and reload the extension from `chrome://extensions`.

Avoid removing and reinstalling the extension unnecessarily, since a different extension ID may prevent automatic reuse of existing local settings and PIN credentials.

## Security and Privacy

FocusGate Kids is designed for family use, with an emphasis on local processing and proportionate parental controls.

- Configuration and usage information are stored using Chrome's local extension storage.
- PIN credentials are stored as salted, derived values after initialization or migration.
- Sensitive parental operations are authenticated by the extension service worker.
- No dedicated FocusGate Kids account is required.
- The Internet time verification feature contacts WorldTimeAPI, which may receive connection metadata such as the public IP address.
- PIN values and browsing history are not intentionally transmitted to the time verification service.

### Important Security Limitations

FocusGate Kids is a browser extension, not a full operating-system parental control solution.

It cannot prevent someone with sufficient access to Chrome or the computer from disabling, removing, or otherwise bypassing the extension.

It also cannot enforce browsing restrictions outside the browser environment in which it is installed.

Time-based restrictions depend on the browser environment and local system clock. Internet time verification provides notifications, not an authoritative time source for access enforcement.

**Current known issue:** Version 2.4.5 uses a 15-minute PIN lockout after five failed attempts. A previously proposed reduction to five minutes has not yet been implemented.

For stronger protection, FocusGate Kids should be combined with appropriate device-level parental controls and restricted operating-system permissions.

## Version History

| Version | Highlights |
|---|---|
| v2.4.1 | Calm and Playful blocking page themes |
| v2.4.2 | Improved PIN security and failed-attempt protection |
| v2.4.3 | Parent dashboard authorization and session controls |
| v2.4.4 | Local system clock change notifications |
| v2.4.5 | Internet time verification and removal of temporary testing controls |

## Project Philosophy

FocusGate Kids is built around three principles:

**Balance over restriction.** Technology can be part of a healthy childhood when clear boundaries exist.

**Parent control with child-friendly communication.** Restrictions should be understandable rather than intimidating or unnecessarily punitive.

**Practical security and transparency.** Parental control mechanisms should be effective within their technical limits, without promising protection they cannot guarantee.

---

**FocusGate Kids — Helping families build healthier digital habits, one browsing session at a time.**
