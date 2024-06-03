"use client";

import React, { useRef, useState } from "react";
import AddIcon from "@/assets/aside_icons/add.js";
import BoxIcon from "@/assets/aside_icons/box.js";
import TruckIcon from "@/assets/aside_icons/truck.js";
import OrdersIcon from "@/assets/aside_icons/orders.js";
import BanIcon from "@/assets/aside_icons/ban.js";
import SettingIcon from "@/assets/aside_icons/setting.js";
import LogoutIcon from "@/assets/aside_icons/logout.js";
import style from "@/css/component/sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Sidebar() {
  const [navOpen, setnavOpen] = useState(false);
  const Link1 = useRef<HTMLAnchorElement>(null);
  const Link2 = useRef<HTMLAnchorElement>(null);
  const Link3 = useRef<HTMLAnchorElement>(null);
  const Link4 = useRef<HTMLAnchorElement>(null);
  const Link5 = useRef<HTMLAnchorElement>(null);
  const Link6 = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  return (
    <nav
      dir="rtl"
      style={{
        // width: "200px",
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
          <div className={style.Icon}>
            <AddIcon color={"white"} />
          </div>
          <Link
            style={{
              opacity: navOpen ? 1 : 0,
            }}
            ref={Link1}
            href={"/admin/addarticle"}
          >
            إضافة منتج
          </Link>
        </li>
        <li onClick={() => Link2.current?.click()}>
          <div className={style.Icon}>
            <BoxIcon color={"white"} />
          </div>

          <Link
            style={{ opacity: navOpen ? 1 : 0 }}
            ref={Link2}
            href={"/admin/article"}
          >
            إدارة المنتجات
          </Link>
        </li>
        <li onClick={() => Link3.current?.click()}>
          <div className={style.Icon}>
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
          <div className={style.Icon}>
            <OrdersIcon color={"white"} />
          </div>
          <Link
            // onClick={() => setnavOpen((prv) => (prv ? false : prv))}
            style={{ opacity: navOpen ? 1 : 0 }}
            ref={Link4}
            href={"/admin/orders"}
          >
            الطلبيات
          </Link>
        </li>
      </div>
      <div className={style.bottom_section}>
        <li onClick={() => Link6.current?.click()}>
          <div className={style.Icon}>
            <SettingIcon color={"white"} />
          </div>

          <Link
            style={{ opacity: navOpen ? 1 : 0 }}
            ref={Link6}
            href={"/admin/setting"}
          >
            إعدادات
          </Link>
        </li>
        <li
          onClick={() => {
            localStorage.removeItem("isAuth");
            router.push("/login");
          }}
        >
          <div className={style.Icon}>
            <LogoutIcon color={"white"} />
          </div>

          <p
            style={{
              opacity: navOpen ? 1 : 0,
            }}
          >
            الخروج
          </p>
        </li>
      </div>
    </nav>
  );
}

export default Sidebar;
