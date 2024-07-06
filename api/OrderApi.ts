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
  confirmed_date: string;
  shipping_date: string;
  desk_price: number;
  home_price: number;
  free_shipping: boolean;
};

// ! ---------- GET ALL ORDERS ------------
export async function getAllOrders(
  date: string,
  status: string,
  offset: number,
  limit: number,
  signal: any
): Promise<Order[] | undefined> {
  if (DEV_MODE) return;
  let url = `${baseUrl}/order`;
  if (status && date) {
    url = `${baseUrl}/order?status=${status}&date=${date}&offset=${offset}&limit=${limit}`;
  }
  if (status && date === "") {
    url = `${baseUrl}/order?status=${status}&offset=${offset}&limit=${limit}`;
  }

  const req = await fetch(url, {
    cache: "no-cache",
    signal: signal,
  });
  if (req.status == 200) return await req.json();
  return undefined;
}

// ! ---------- GET ORDERS COUNT NUMBER ------------
export async function getOrdersCount(
  status: string = "none"
): Promise<number | undefined> {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/order/count?status=${status}`, {
    cache: "no-cache",
  });
  if (req.status == 200) return await req.json();

  return undefined;
}
// ! ---------- CREATE AN ORDER ------------
export async function createOrder(
  data: Order,
  article_id: number,
  signal: any
) {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/article/${article_id}/order`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return req.status;
}
// ! ---------- SET ORDERS CONFIRMED ------------
export async function setOrderCONFIRMED(ordersList: Order[]) {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/order/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ordersList),
  });
  return req.status;
}
// ! ---------- CHANGE ORDERS STATUS ------------

export async function changeOrderStatus(status: string, ordersList: Order[]) {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/order/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: status, orders: ordersList }),
  });
  return req.status;
}
// ! ---------- REMOVE ORDER ------------
export async function removeOrder(ordersList: Order[]) {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/order/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ordersList),
  });
}

// ! ---------- ADD TO BLACKLIST ------------
export async function addToBlackilist(ordersList: Order[]) {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/blacklist/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ordersList),
  });
}
