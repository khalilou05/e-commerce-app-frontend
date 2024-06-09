import { SERVER_IP, DEV_MODE } from "../settings.js";
const baseUrl = SERVER_IP;
export type Order = {
  id: number;
  full_name: string;
  phone_number: string;
  wilaya: string;
  baladiya: string;
  price: number;
  article_id: number;
  reference: string;
  quantity: number;
  home_dilevery: boolean;
  order_date: string;
  desk_price: number;
  home_price: number;
};

// ! ---------- GET ALL ORDERS ------------
export async function getAllOrders(signal: any): Promise<Order[] | undefined> {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/order`, {
    cache: "no-cache",
    signal: signal,
  });
  if (req.status == 200) return await req.json();
  return undefined;
}

// ! ---------- CREATE AN ORDER ------------
export async function createOrder(
  data: Order,
  token: string,
  signal: any
): Promise<Order | undefined> {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/order`, {
    cache: "no-cache",
    body: JSON.stringify(data),
    headers: {
      token: token,
    },
    signal: signal,
  });
  const resp = await req.json();
  return resp;
}
// ! ---------- SET ORDER DELIVRED ------------
export async function setOrderDelivred() {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/order/confirm`, {
    method: "POST",
    cache: "no-cache",
  });
}
// ! ---------- REMOVE ORDER ------------
export async function removeOrder(
  idList: number[],
  token: string,
  signal: any
) {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/order/`, {
    method: "DELETE",
    headers: {
      token: token,
    },
    body: JSON.stringify(idList),
    signal: signal,
  });
}

// ! ---------- ADD TO BLACKLIST ------------
export async function addToBlackilist(
  phoneNmList: string[],
  token: string,
  signal: any
) {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/blacklist`, {
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone_number: phoneNmList }),
    signal: signal,
  });
}
