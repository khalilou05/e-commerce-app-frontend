import { SERVER_IP } from "@/constant";
const baseUrl = SERVER_IP;

export type wilayaData = {
  [key: string]: string | number;
  id: number;
  wilaya: string;
  wilaya_code: string;
  desk_price: number;
  home_price: number;
};

export type baladiyaItem = {
  id: number;
  baladiya_name: string;
};

export type baladiya = {
  wilaya_code: number;
  wilaya: string;
  baladiya: baladiyaItem[];
};

export async function getAllWilaya(): Promise<wilayaData[] | null> {
  const req = await fetch(`${baseUrl}/shipping/available`, {
    cache: "no-cache",
  });
  if (req.ok) return await req.json();
  return null;
}

export async function getBaladiya(): Promise<baladiya[] | null> {
  const baladiya = fetch(`${baseUrl}/algeria_cities3.json`);
  const data = (await baladiya).json();
  return data;
}
