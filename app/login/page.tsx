"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import style from "@/css/route/login.module.css";
import LockIcon from "@/assets/login_icon/lock.js";
import EyeCrossedIcon from "@/assets/login_icon/eyecrossed.js";
import EyeOpned from "@/assets/login_icon/eyeOpen.js";
import Loding from "@/components/Loding";
import { SERVER_IP } from "../../settings.js";

function AdminLogin() {
  const loginData = useRef({
    username: "",
    password: "",
  });
  const [passEmpty, setPassEmpty] = useState(true);
  const [showpassword, setshowpassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setpageLoading] = useState(true);

  const controler = new AbortController();
  const firstInpt = useRef<HTMLInputElement | null>(null);
  const passInpt = useRef<HTMLInputElement | null>(null);
  const route = useRouter();
  const { signal } = controler;

  async function Login(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): Promise<any> {
    event.preventDefault();

    if (firstInpt.current?.value == "") {
      firstInpt.current.focus();

      return;
    }
    if (passInpt.current?.value == "") {
      passInpt.current.focus();

      return;
    }

    try {
      setLoading(true);
      const req = await fetch(`${SERVER_IP}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(loginData.current),
        signal,
      });
      if (req.ok) {
        const token = await req.json();
        localStorage.setItem("isAuth", "yes");
        localStorage.setItem("TOKEN", token);
        route.push("/admin");
      }
      setTimeout(() => {
        setLoading(false);
        setLoginError(true);
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        setLoginError(true);
      }, 1000);
    }
  }

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth") || false;
    if (isAuth) {
      route.push("/admin");
      return;
    }
    setpageLoading(false);
  }, []);

  if (pageLoading) {
    return (
      <section className={style.wraper}>
        <Loding size="100px" />
      </section>
    );
  }

  return (
    <section className={style.wraper}>
      <form className={style.form} dir="rtl">
        <div className={style.top}>
          <h1>لوحة التحكم</h1>
          <LockIcon />
        </div>
        <div className={style.main}>
          <span
            className={style.error_msg}
            style={{
              opacity: loginError ? "1" : "0",
            }}
          >
            إسم المستخدم أو كلمة السر خاطئة
          </span>
          <div className={style.input_container}>
            <input
              ref={firstInpt}
              tabIndex={1}
              type="text"
              className={style.inp_usr}
              autoComplete="off"
              required
              onChange={(e) => {
                loginData.current.username = e.target.value;
              }}
            />
            <p className={style.username}>إسم المستخدم</p>
            <span
              className={style.eye_cross}
              style={{
                opacity: passEmpty ? "0" : "1",
              }}
              onClick={() => setshowpassword((prv) => !prv)}
            >
              {showpassword ? (
                <EyeCrossedIcon size={"15px"} />
              ) : (
                <EyeOpned size={"15px"} />
              )}
            </span>
            <input
              tabIndex={2}
              className={style.inp_pass}
              autoComplete="off"
              type={showpassword ? "text" : "password"}
              ref={passInpt}
              required
              onChange={(e) => {
                loginData.current.password = e.target.value;
                if (loginData.current.password == "") {
                  setPassEmpty(true);
                  return;
                }
                setPassEmpty(false);
              }}
            />
            <p className={style.password}>كلمة السر</p>
            <div className={style.inp_btm}>
              <button
                disabled={loading}
                tabIndex={3}
                type="submit"
                onClick={Login}
              >
                {loading ? <Loding size="30px" /> : "دخول"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AdminLogin;
