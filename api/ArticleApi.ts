const baseUrl = "http://127.0.0.1:8000";

import type { articleData } from "@/app/admin/addarticle/page";
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
}[];

// ! ---------- GET ALL ARTICLE ------------
export const getAllArticle = async (
  signal: any
): Promise<UIAllarticle[] | null> => {
  const req = await fetch(`${baseUrl}/article/`, {
    cache: "no-cache",
    signal: signal,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resp = await req.json();
  return resp;
};

// ! ---------- GET ARTICLE BY ID ------------
export const getArticleById = async (id: string): Promise<UIArticle | null> => {
  const req = await fetch(`${baseUrl}/article/${id}`, {
    cache: "no-cache",
  });

  const resp = await req.json();

  return resp;
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
export const createArticle = async (data: articleData) => {
  const req = await fetch(`${baseUrl}/article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resp = await req.json();
  return resp;
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
