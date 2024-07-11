import { SERVER_IP, DEV_MODE } from "../settings.js";
const baseUrl = SERVER_IP;

type LoginData = {
  username: string;
  password: string;
};

// ! ---------- ADMIN LOGIN ------------
export async function adminLogin(loginData: LoginData) {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  return req;
}
// ! ---------- ADD TO BLACKLIST ------------
export async function addToBlacklist() {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/blacklist`, {
    method: "POST",
    headers: {
      // Authorization: `Basic ${TOKEN}`,
    },
  });
  const resp = await req.json();
  return resp;
}

// ! ---------- REMEOVE FROM BLACKLIST ------------
export async function removeFrmBlacklist(phone_number: number) {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/blacklist`, {
    method: "DELETE",
    headers: {
      // Authorization: `Basic ${TOKEN}`,
    },
    body: JSON.stringify(phone_number),
  });
  const resp = await req.json();
  return resp;
}
