"use client";

import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@/assets/aside_icons/add.js";
import BoxIcon from "@/assets/aside_icons/box.js";
import TruckIcon from "@/assets/aside_icons/truck.js";
import OrdersIcon from "@/assets/aside_icons/orders.js";
import SettingIcon from "@/assets/aside_icons/setting.js";
import LogoutIcon from "@/assets/aside_icons/logout.js";
import MoonIcon from "@/assets/aside_icons/moon.js";
import SunIcon from "@/assets/aside_icons/sun.js";
import style from "@/css/component/sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Sidebar() {
  const [navOpen, setnavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState("dark");

  const Link1 = useRef<HTMLAnchorElement>(null);
  const Link2 = useRef<HTMLAnchorElement>(null);
  const Link3 = useRef<HTMLAnchorElement>(null);
  const Link4 = useRef<HTMLAnchorElement>(null);
  const Link6 = useRef<HTMLAnchorElement>(null);

  const router = useRouter();

  useEffect(() => {
    const bodyEl = document.getElementById("body");
    bodyEl?.setAttribute("data-theme", darkMode);
  }, [darkMode]);

  return (
    <nav
      dir="rtl"
      style={{
        width: navOpen ? "200px" : "60px",
      }}
      className={style.wraper}
    >
      <div className={style.top_section}>
        <div
          onClick={() => setnavOpen((prev) => !prev)}
          className={style.menuIcon}
        >
          <span
            className={navOpen ? style.top_line__close : style.top_line}
          ></span>
          <span className={style.mid_line}></span>
          <span
            className={navOpen ? style.last_line__close : style.last_line}
          ></span>
        </div>
      </div>
      <div className={style.midle_section}>
        <li onClick={() => Link1.current?.click()}>
          <div>
            <AddIcon />
          </div>
          <Link
            style={{
              opacity: navOpen ? 1 : 0,
            }}
            ref={Link1}
            href={"/admin/addarticle"}
          >
            إضـافـة مـنـتـج
          </Link>
        </li>
        <li onClick={() => Link2.current?.click()}>
          <div>
            <BoxIcon />
          </div>

          <Link
            style={{ opacity: navOpen ? 1 : 0 }}
            ref={Link2}
            href={"/admin/article"}
          >
            إدارة المنـتجـات
          </Link>
        </li>
        <li onClick={() => Link3.current?.click()}>
          <div>
            <TruckIcon />
          </div>

          <Link
            style={{ opacity: navOpen ? 1 : 0 }}
            ref={Link3}
            href={"/admin/shipping"}
          >
            أسعار التوصيل
          </Link>
        </li>
        <li onClick={() => Link4.current?.click()}>
          <div>
            <OrdersIcon color={"white"} />
          </div>
          <Link
            style={{ opacity: navOpen ? 1 : 0 }}
            ref={Link4}
            href={"/admin"}
          >
            الــطـلـبـــيـــات
          </Link>
        </li>
      </div>
      <div className={style.bottom_section}>
        <li
          style={{ userSelect: "none" }}
          onClick={() => {
            setDarkMode((prv) =>
              prv === "dark" ? "light" : prv === "light" ? "dark" : "dark"
            );
          }}
        >
          <div>{darkMode == "dark" ? <SunIcon /> : <MoonIcon />}</div>
          <a
            style={{
              opacity: navOpen ? 1 : 0,
              textWrap: "nowrap",
              userSelect: "none",
            }}
          >
            {darkMode == "dark" ? "الوضع النهاري" : "الوضع الليلي"}
          </a>
        </li>
        <li onClick={() => Link6.current?.click()}>
          <div>
            <SettingIcon color={"white"} />
          </div>

          <Link
            style={{ opacity: navOpen ? 1 : 0 }}
            ref={Link6}
            href={"/admin/setting"}
          >
            إعـــــدادات
          </Link>
        </li>
        <li
          onClick={() => {
            localStorage.removeItem("isAuth");
            router.push("/login");
          }}
        >
          <div>
            <LogoutIcon />
          </div>

          <a
            style={{
              opacity: navOpen ? 1 : 0,
              userSelect: "none",
            }}
          >
            الــخـــروج
          </a>
        </li>
      </div>
    </nav>
  );
}

export default Sidebar;
