const baseUrl = "http://127.0.0.1:8000";
const token = localStorage.getItem("token") || "";

type LoginData = {
  username: string;
  password: string;
};

// ! ---------- ADD TO BLACKLIST ------------
export async function addToBlacklist<T>(): Promise<T> {
  const req = await fetch(`${baseUrl}/blacklist`, {
    method: "POST",
    headers: {
      token: token,
    },
  });
  const resp = await req.json();
  return resp;
}

// ! ---------- REMEOVE FROM BLACKLIST ------------
export async function removeFrmBlacklist(phone_number: number) {
  const req = await fetch(`${baseUrl}/blacklist`, {
    method: "DELETE",
    headers: {
      token: token,
    },
    body: JSON.stringify(phone_number),
  });
  const resp = await req.json();
  return resp;
}

// ! ---------- ADMIN LOGIN  ------------
export async function adminLogin(loginData: LoginData) {
  const req = await fetch(`${baseUrl}/blacklist`, {
    method: "POST",
    headers: {
      //todo   content type
    },
    body: JSON.stringify(loginData),
  });
  const resp = await req.json();
  return resp;
}
