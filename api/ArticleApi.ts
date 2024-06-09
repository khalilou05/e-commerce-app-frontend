import { SERVER_IP, DEV_MODE } from "../settings.js";
const baseUrl = SERVER_IP;

export type UIArticle = {
  id: number;
  title: string;
  price: number;
  description: string;
  img_url: string[];
};

export type UIAllarticle = {
  title: string;
  price: number;
  img_url: string;
  quantity: number;
  free_shipping: boolean;
  published: string;
};

// ! ---------- GET ALL ARTICLE ------------
export const getAllArticle = async (): Promise<UIAllarticle[] | undefined> => {
  if (DEV_MODE) return;
  try {
    const req = await fetch(`${baseUrl}/`, { cache: "no-store" });
    if (req.status === 200) {
      return req.json();
    }
    return undefined;
  } catch (err) {
    console.error(err);
  }
};

// ! ---------- GET ARTICLE BY ID ------------
export const getArticleById = async (
  id: string
): Promise<UIArticle | undefined> => {
  if (DEV_MODE) return;

  try {
    const req = await fetch(`${baseUrl}/article/${id}`, {});
    if (req.status == 200) return req.json();
    return undefined;
  } catch (err) {
    console.error(err);
  }
};

// ! ---------- DELETE ARTICLE  ------------
export const deleteArticle = async (id: number) => {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/article/${id}`, {
    method: "DELETE",
    headers: {},
  });
  const resp = await req.json();
  return resp;
};

// ! ---------- CREATE ARTICLE  ------------
export const createArticle = async (data: FormData) => {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/article/add`, {
    method: "POST",

    body: data,
  });
  return req;
};

// ! ---------- UPDATE ARTICLE  ------------
export const updateArticle = async (data: UIArticle, id: number) => {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/article/${id}`, {
    method: "PUT",
    headers: {},
    body: JSON.stringify(data),
  });
  const resp = await req.json();
  return resp;
};

// ! ---------- UPLOAD ARTICLE IMAGES  ------------
export const uploadArticleImg = async (images: any, id: number) => {
  if (DEV_MODE) return;

  const req = await fetch(`${baseUrl}/article/img`, {
    method: "POST",
    headers: {},
    body: images,
  });
  const resp = await req.json();
  return resp;
};
