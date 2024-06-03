import { SERVER_IP } from "@/constant";
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
export const getAllArticle = async (): Promise<UIAllarticle[] | null> => {
  const req = await fetch(`${baseUrl}/`);
  if (req.status === 200) return req.json();
  return null;
};

// ! ---------- GET ARTICLE BY ID ------------
export const getArticleById = async (id: string): Promise<UIArticle | null> => {
  const req = await fetch(`${baseUrl}/article/${id}`, {});
  if (req.status == 200) return req.json();
  return null;
};

// ! ---------- DELETE ARTICLE  ------------
export const deleteArticle = async (id: number) => {
  const req = await fetch(`${baseUrl}/article/${id}`, {
    method: "DELETE",
    headers: {},
  });
  const resp = await req.json();
  return resp;
};

// ! ---------- CREATE ARTICLE  ------------
export const createArticle = async (data: FormData) => {
  const req = await fetch(`${baseUrl}/article/add`, {
    method: "POST",

    body: data,
  });
  return req;
};

// ! ---------- UPDATE ARTICLE  ------------
export const updateArticle = async (data: UIArticle, id: number) => {
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
  const req = await fetch(`${baseUrl}/article/img`, {
    method: "POST",
    headers: {},
    body: images,
  });
  const resp = await req.json();
  return resp;
};
