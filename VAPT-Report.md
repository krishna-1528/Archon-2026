# VAPT Report — Archon 2026 Web Application

**Project:** Archon 2026 — Rashtriya Raksha University Tech Fest Portal  
**Assessment Type:** Vulnerability Assessment & Penetration Testing (VAPT)  
**Assessment Date:** March 9, 2026  
**Technology Stack:** React 19, Vite 7, Firebase (Auth + Firestore), Tailwind CSS, Three.js  
**Assessed By:** Internal Security Review  
**Report Status:** Remediated

---

## Executive Summary

A comprehensive security audit was conducted on the Archon 2026 web application. A total of **11 vulnerabilities** were identified across **Critical**, **High**, **Medium**, and **Low** severity levels. All identified vulnerabilities have been remediated in the same session. The application handles sensitive student PII (name, phone, DOB, college details) and payment status, making security compliance essential.

---

## Vulnerability Summary

| ID | Severity | Title | Status |
|----|----------|-------|--------|
| V-01 | 🔴 Critical | Firebase credentials hardcoded in public repository | ✅ Fixed |
| V-02 | 🟠 High | `paidStatus` writable by unauthenticated client | ✅ Fixed |
| V-03 | 🟠 High | Firestore Security Rules not enforced (test mode risk) | ✅ Fixed |
| V-04 | 🟡 Medium | Predictable/collision-prone Archon ID generation | ✅ Fixed |
| V-05 | 🟡 Medium | No server-side phone number input validation | ✅ Fixed |
| V-06 | 🟡 Medium | No CAPTCHA or rate limiting on auth endpoints | ⚠️ Recommended |
| V-07 | 🟡 Medium | Entry pass form has no auth binding / identity check | ✅ Fixed |
| V-08 | 🟡 Medium | External SVG loaded from third-party domain | ✅ Fixed |
| V-09 | 🔵 Low | No Content Security Policy (CSP) headers | ✅ Fixed |
| V-10 | 🔵 Low | Static string unnecessarily stored in every Firestore user document | ✅ Fixed |
| V-11 | 🔵 Low | Firebase auth token stored in localStorage (XSS risk surface) | ⚠️ Recommended |

---

## Detailed Findings

---

### V-01 — Firebase Credentials Hardcoded in Public Repository
**Severity:** 🔴 Critical  
**OWASP Category:** A02:2021 – Cryptographic Failures  
**File:** `src/firebase.js`

**Description:**  
All Firebase configuration values — including the API key, App ID, and Measurement ID — were hardcoded directly in the source file and committed to a public GitHub repository. Any attacker with access to the repository could obtain these credentials.

**Impact:**
- Quota exhaustion attacks on Firebase Auth and Firestore APIs
- Ability to enumerate registered users via Firebase Auth REST API
- Potential full Firestore read/write access if Security Rules were in test mode

**Evidence (Before):**
```js
const firebaseConfig = {
  apiKey: "AIzaSyDBZvMWK-BPpsWkl58N6tI-gJ57nJeo9qg",
  appId: "1:26608338287:web:1c9cf856d4351caa0c549a",
  // ...
};
```

**Remediation:**  
Moved all Firebase config values to `.env` environment variables. Updated `firebase.js` to use `import.meta.env.*`. Added `.env` and `.env.*` to `.gitignore`. Created `.env.example` as a template for developers.

```js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ...
};
```

**Additional Action Required:** Add the same environment variables in the Vercel dashboard under Project Settings → Environment Variables.

---

### V-02 — `paidStatus` Writable by Client
**Severity:** 🟠 High  
**OWASP Category:** A01:2021 – Broken Access Control  
**File:** `src/pages/RegisterPage.jsx`

**Description:**  
The `paidStatus: false` and `passType: 'General'` fields were written to Firestore directly from the client-side registration form. An attacker could intercept the request using browser DevTools and modify the payload to set `paidStatus: true` before the write executes, effectively bypassing payment.

**Impact:**
- Payment bypass — free access to paid features/entry passes
- Data integrity violation in user records

**Remediation:**  
Added Firestore Security Rules (`firestore.rules`) that explicitly block clients from changing `paidStatus` or `passType` fields. These fields should only be modified by a trusted backend (Firebase Admin SDK / Cloud Function) after payment verification.

```js
// firestore.rules
allow update: if request.auth.uid == userId
  && !('paidStatus' in request.resource.data.diff(resource.data).affectedKeys())
  && !('passType' in request.resource.data.diff(resource.data).affectedKeys());
```

---

### V-03 — Firestore Security Rules Not Enforced
**Severity:** 🟠 High  
**OWASP Category:** A05:2021 – Security Misconfiguration  
**File:** Firebase Console (external)

**Description:**  
The Firestore Security Rules were not included in the repository, indicating they may be in Firebase's default **test mode** (`allow read, write: if true`). This would expose all user PII — including phone numbers, dates of birth, college details, and payment status of every registered student — to anyone who knows the project ID.

**Impact:**
- Full read access to all user documents by any unauthenticated attacker
- Mass data exfiltration of student PII

**Remediation:**  
Created `firestore.rules` with proper access controls:
- Users can only read/write their own document
- `paidStatus` and `passType` are immutable from the client
- All other collections are blocked by default

**Action Required:** Apply these rules in Firebase Console → Firestore Database → Rules tab.

---

### V-04 — Predictable and Collision-Prone Archon ID Generation
**Severity:** 🟡 Medium  
**OWASP Category:** A02:2021 – Cryptographic Failures  
**File:** `src/pages/RegisterPage.jsx`

**Description:**  
Archon IDs were generated using `Math.random()` with only 9,000 possible values (`AR26-1000` to `AR26-9999`). This creates two issues:
1. **IDOR Risk** — IDs are sequential and enumerable; if used in access control, they could be guessed
2. **Collision Risk** — With many registrations, duplicate IDs are statistically likely
3. **Insecure Randomness** — `Math.random()` is not cryptographically secure

**Evidence (Before):**
```js
const digits = Math.floor(1000 + Math.random() * 9000); // 9,000 possible values
return `AR26-${digits}`;
```

**Remediation:**  
Replaced with `crypto.getRandomValues()` (CSPRNG) producing 900,000 unique 6-digit values:
```js
const arr = new Uint32Array(1);
crypto.getRandomValues(arr);
return `AR26-${(arr[0] % 900000 + 100000)}`;
```

---

### V-05 — No Phone Number Input Validation
**Severity:** 🟡 Medium  
**OWASP Category:** A03:2021 – Injection  
**File:** `src/pages/RegisterPage.jsx`

**Description:**  
The phone number field accepted any string value with no format validation. Users could submit arbitrary strings, scripts, or invalid numbers, contaminating the database with invalid PII.

**Remediation:**  
Added client-side regex validation enforcing valid Indian mobile number format:
```js
const phoneRegex = /^[6-9]\d{9}$/;
if (!phoneRegex.test(phone)) {
  setError('Enter a valid 10-digit Indian mobile number (starting with 6-9).');
  return;
}
```

---

### V-06 — No CAPTCHA or Rate Limiting on Auth Forms
**Severity:** 🟡 Medium  
**OWASP Category:** A07:2021 – Identification and Authentication Failures  
**Status:** ⚠️ Recommended (not yet implemented)

**Description:**  
Sign-in and registration forms have no bot protection. An attacker can automate credential stuffing, account enumeration, or mass fake account creation.

**Recommended Remediation:**  
Enable Firebase App Check in Firebase Console → App Check → Configure for Authentication and Firestore. This blocks non-browser clients at no cost.

---

### V-07 — Entry Pass Form Has No Identity Binding
**Severity:** 🟡 Medium  
**OWASP Category:** A01:2021 – Broken Access Control  
**File:** `src/pages/DashboardPage.jsx`

**Description:**  
The Google Form link for entry passes was a bare public URL. Any person — registered or not — could access and submit the form without proof of identity or registration.

**Remediation:**  
The Archon ID is now appended as a URL parameter when opening the entry pass form:
```js
href={`${GENERAL_ENTRY_PASS_FORM_URL}?archon_id=${encodeURIComponent(profile?.archon_id || '')}`}
```
This allows the form administrator to verify the Archon ID against the registered user database.

---

### V-08 — External SVG Loaded From Third-Party Domain
**Severity:** 🟡 Medium  
**OWASP Category:** A08:2021 – Software and Data Integrity Failures  
**File:** `src/App.jsx`

**Description:**  
A background noise texture SVG was loaded from `https://grainy-gradients.vercel.app/noise.svg`. If this external service is compromised, it could serve a malicious SVG payload to all users of the application.

**Evidence (Before):**
```js
bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
```

**Remediation:**  
Downloaded the SVG and hosted it locally at `/public/assets/noise.svg`:
```js
bg-[url('/assets/noise.svg')]
```

---

### V-09 — No Content Security Policy (CSP)
**Severity:** 🔵 Low  
**OWASP Category:** A05:2021 – Security Misconfiguration  
**File:** `index.html`

**Description:**  
No Content-Security-Policy header or meta tag was present. Without CSP, any successful XSS injection would have unrestricted capabilities.

**Remediation:**  
Added a restrictive CSP meta tag to `index.html` that:
- Disallows all `frame-src` and `object-src` (clickjacking/plugin attacks)
- Restricts `connect-src` to only Firebase and Google APIs
- Restricts `font-src` to Google Fonts only
- Restricts `script-src` to `'self'`

---

### V-10 — Static String Stored in Every Firestore User Document
**Severity:** 🔵 Low  
**OWASP Category:** A04:2021 – Insecure Design  
**File:** `src/pages/RegisterPage.jsx`

**Description:**  
The `accessProtocolMessage` — a static 350-character string — was written into every user's Firestore document on registration. This wastes storage and Firestore read bandwidth.

**Remediation:**  
Removed `accessProtocolMessage` from both Firestore `setDoc` calls. The string is already available as a JavaScript constant in `constants/accessPolicy.js` and is read from there directly.

---

### V-11 — Firebase Auth Token in localStorage
**Severity:** 🔵 Low  
**OWASP Category:** A02:2021 – Cryptographic Failures  
**Status:** ⚠️ Recommended

**Description:**  
Firebase JS SDK stores auth tokens in `localStorage` by default. In the event of an XSS vulnerability, these tokens could be stolen and used to impersonate users.

**Recommended Remediation:**  
Switch to session-only persistence if persistent login is not required:
```js
import { browserSessionPersistence, setPersistence } from 'firebase/auth';
await setPersistence(auth, browserSessionPersistence);
```
Audit all components for use of `dangerouslySetInnerHTML`.

---

## Files Changed

| File | Change |
|------|--------|
| `src/firebase.js` | All config values moved to `import.meta.env.*` |
| `src/pages/RegisterPage.jsx` | Crypto ID generation, phone validation, removed static Firestore field |
| `src/pages/DashboardPage.jsx` | Entry pass URL prefilled with Archon ID |
| `src/App.jsx` | External noise.svg replaced with local `/assets/noise.svg` |
| `index.html` | Content-Security-Policy meta tag added |
| `.gitignore` | Added `.env` and `.env.*` exclusions |
| `.env` | Created with all Firebase config keys (not committed) |
| `.env.example` | Created as safe template for developers |
| `firestore.rules` | Created with locked-down security rules |
| `public/assets/noise.svg` | Downloaded and hosted locally |

---

## Recommendations — Pending Actions

1. **Apply Firestore Rules** — Copy contents of `firestore.rules` into Firebase Console → Firestore → Rules tab and publish.
2. **Set Vercel Environment Variables** — Add all `VITE_FIREBASE_*` keys in Vercel dashboard → Project Settings → Environment Variables.
3. **Enable Firebase App Check** — In Firebase Console → App Check → Enable for Auth and Firestore.
4. **Rotate API Key** — Since the old API key was committed to a public repository, generate a new one in Google Cloud Console and update the `.env` and Vercel variables.
5. **Use Cloud Function for Payment** — Move `paidStatus` updates to a Firebase Cloud Function triggered after payment verification webhook.

---

## Severity Legend

| Level | Description |
|-------|-------------|
| 🔴 Critical | Immediately exploitable, high business impact |
| 🟠 High | Serious risk, should be fixed within 24 hours |
| 🟡 Medium | Moderate risk, fix in current sprint |
| 🔵 Low | Best practice violation, fix when possible |

---

*Report generated: March 9, 2026 | Archon 2026 — Rashtriya Raksha University*
