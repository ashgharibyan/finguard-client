"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function loggedIn() {
  const session = (await cookies()).get("session");

  if (session) {
    const isExpired = await isTokenExpired(session.value);
    return { authenticated: true, expired: isExpired };
  }

  return { authenticated: false, expired: false };
}

export async function isTokenExpired(token: string) {
  const decoded = jwtDecode(token);
  return (decoded?.exp ?? 0) < Date.now() / 1000;
}

export async function getToken() {
  const session = (await cookies()).get("session");
  return session?.value;
}

export async function login(idToken: string) {
  (await cookies()).set("session", idToken);
  return { success: true };
}

export async function logout() {
  const session = (await cookies()).get("session");
  if (session) {
    (await cookies()).delete("session");
  }
  return { success: true };
}
