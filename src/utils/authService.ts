"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Description: This service handles authentication-related tasks such as login, logout, token management, and user profile retrieval.
 * It interacts with JWT tokens stored in local storage to manage user sessions.
 */

export async function getProfile() {
  /**
   * @return: Decoded JWT payload
   * Description: This method retrieves the current user's profile by decoding the stored JWT token.
   * It relies on the getToken method to fetch the token from local storage.
   */

  const token: string | undefined = await getToken();

  if (token) {
    const userId = jwtDecode(token);
    return userId;
  } else {
    return null;
  }
}

export async function loggedIn() {
  /**
   * @return: Boolean indicating if the user is logged in
   * Description: This method checks if the user is logged in by verifying the presence of a valid, non-expired JWT token.
   * It returns true if the token exists and is not expired, otherwise it returns false.
   */

  const session = (await cookies()).get("session");

  if (session) {
    const isExpired = await isTokenExpired(session.value);
    return { authenticated: true, expired: isExpired };
  }

  return { authenticated: false, expired: false };
}

export async function isTokenExpired(token: string) {
  /**
   * @param token: JWT token string
   * @return: Boolean indicating if the token is expired
   * Description: This method checks whether a given JWT token has expired.
   * It decodes the token to get its expiration time and compares it with the current time.
   * If the token is expired, it removes the token from local storage and returns true.
   */

  const decoded = jwtDecode(token);

  if ((decoded?.exp ?? 0) < Date.now() / 1000) {
    return true;
  }

  return false;
}

export async function getToken() {
  /**
   * @return: JWT token string
   * Description: This method retrieves the JWT token from local storage.
   * It is used by other methods to access the stored token.
   */

  const session = (await cookies()).get("session");
  return session?.value;
}

export async function login(idToken: string) {
  /**
   * @param idToken: JWT token string
   * Description: This method handles the login process by storing the provided JWT token in local storage and redirecting the user to the home page.
   * It clears any previous token before storing the new one.
   */

  (
    await /**
     * @param idToken: JWT token string
     * Description: This method handles the login process by storing the provided JWT token in local storage and redirecting the user to the home page.
     * It clears any previous token before storing the new one.
     */
    cookies()
  ).set("session", idToken);
  redirect("/dashboard");
}

export async function logout() {
  /**
   * Description: This method handles the logout process by decoding the JWT token, removing it from local storage, and reloading the page.
   * The decoded token can be logged to the console for debugging purposes.
   */

  const session = (await cookies()).get("session");
  if (session) {
    (await cookies()).delete("session");
  }
  return { success: true };
}
