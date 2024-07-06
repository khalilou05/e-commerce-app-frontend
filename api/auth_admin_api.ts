import { SERVER_IP, DEV_MODE } from "../settings.js";
const baseUrl = SERVER_IP;
const TOKEN = localStorage.getItem("token") || "";

type LoginData = {
  username: string;
  password: string;
};

// ! ---------- ADD TO BLACKLIST ------------
export async function addToBlacklist<T>(): Promise<T | undefined> {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/blacklist`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${TOKEN}`,
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
      Authorization: `Basic ${TOKEN}`,
    },
    body: JSON.stringify(phone_number),
  });
  const resp = await req.json();
  return resp;
}
