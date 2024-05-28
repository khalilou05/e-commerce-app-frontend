const baseUrl = "http://127.0.0.1:8000";

export type wilayaData = {
  [key: string]: string | number;
  id: number;
  wilaya: string;
  wilaya_code: string;
  desk_price: number;
  home_price: number;
};

export async function getAllWilaya(): Promise<wilayaData[] | null> {
  const req = await fetch(`${baseUrl}/shipping/available`, {
    cache: "no-cache",
  });
  if (req.ok) return await req.json();
  return null;
}
