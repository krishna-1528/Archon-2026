export const TACTICAL_BANNER_TEXT =
  'Access Granted via Entry Fee OR Event Registration. If you are participating in any event, your Event QR serves as your 3-day Entry Pass. No separate fee is required.';

export const ACCESS_PROTOCOL_MESSAGE = `Access Protocol: Archon 2026
To secure your 3-day entry pass, you must complete one of the following:

- Pay the General Entry Fee by clicking the 'Entry Pass' button.
- Register and pay for any technical or gaming event.

Note: If you have registered for an event, you do NOT need a separate entry pass. Your verified Event QR will grant you access to the university for all 3 days. Your QR will be sent via email within 24 hours of payment verification.`;

export const ENTRY_PASS_TOOLTIP = 'Only for non-participants.';

export const GENERAL_ENTRY_PASS_FORM_URL =
  import.meta.env.VITE_ARCHON_GOOGLE_FORM_URL ||
  import.meta.env.VITE_GENERAL_ENTRY_PASS_FORM_URL ||
  'https://forms.gle/archon-entry-pass';
