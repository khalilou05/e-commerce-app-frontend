import { SERVER_IP } from "../settings.js";
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

export async function getAllWilaya(): Promise<wilayaData[] | undefined> {
  try {
    const req = await fetch(`${baseUrl}/shipping/available`, {
      cache: "no-cache",
    });
    if (req.status == 200) return await req.json();
    return undefined;
  } catch (err) {
    console.error(err);
  }
}

export async function getBaladiya(): Promise<baladiya[] | null> {
  const baladiya = fetch(`/algeria_cities3.json`);
  const data = (await baladiya).json();

  return data;
}
