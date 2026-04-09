/**
 * Captive Portal Auth Utility
 * Converted from jQuery AJAX to Next.js-compatible fetch API
 */

const BASE_URL = ""; // Set to your API base URL if needed, e.g. "https://your-router-ip"

/**
 * Get the redirect URL from the current page's query params.
 * Call this on the client side only (inside useEffect or event handlers).
 * @returns {string|null}
 */
export function getRedirectUrl() {
  if (typeof window === "undefined") return null;
  return new URL(window.location.href).searchParams.get("redirurl");
}

/**
 * Redirect after successful login.
 * @param {string|null} redirurl
 */
export function handlePostLoginRedirect(redirurl) {
  if (redirurl) {
    window.location.href = `http://${redirurl}?refresh`;
  } else {
    window.location.reload();
  }
}

/**
 * Log in with username and password.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export async function logon(username, password) {
  try {
    const body = new URLSearchParams({ user: username, password });

    const response = await fetch(`${BASE_URL}/api/captiveportal/access/logon/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();

    if (data.clientState === "AUTHORIZED") {
      return { success: true, data };
    }

    return { success: false, error: "authentication failed", data };
  } catch {
    return { success: false, error: "unable to connect to authentication server" };
  }
}

/**
 * Log off the current session.
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function logoff() {
  try {
    const body = new URLSearchParams({ user: "", password: "" });

    const response = await fetch(`${BASE_URL}/api/captiveportal/access/logoff/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) throw new Error("Server error");

    window.location.reload();
    return { success: true };
  } catch {
    return { success: false, error: "unable to connect to authentication server" };
  }
}

/**
 * Check current authentication status.
 * Use this on page load to determine which UI to show.
 * @returns {Promise<{ clientState?: string, authType?: string, error?: string }>}
 */
export async function getStatus() {
  try {
    const body = new URLSearchParams({ user: "", password: "" });

    const response = await fetch(`${BASE_URL}/api/captiveportal/access/status/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();
    return data;
  } catch {
    return { error: "unable to connect to authentication server" };
  }
}