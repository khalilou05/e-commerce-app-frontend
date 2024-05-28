const baseUrl = "http://127.0.0.1:8000";
export type Order = {
  id: number;
  full_name: string;
  phone_number: string;
  wilaya: string;
  baladiya: string;
  price: number;
  article_id: number;
  quantity: number;
  home_dilevery: boolean;
  order_date: string;
  desk_price: number;
  home_price: number;
};

// ! ---------- GET ALL ORDERS ------------
export async function getAllOrders(
  signal: any,
  reqUrl: string
): Promise<Order[] | null> {
  const req = await fetch(`${baseUrl}/${reqUrl}`, {
    cache: "no-cache",
    signal: signal,
  });
  if (req.ok) return await req.json();
  return null;
}

// ! ---------- CREATE AN ORDER ------------
export async function createOrder(
  data: Order,
  token: string,
  signal: any
): Promise<Order | null> {
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
