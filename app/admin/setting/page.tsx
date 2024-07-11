"use client";
import React, { useRef, useState } from "react";
import style from "@/css/route/setting.module.css";
import ReseTIcon from "@/assets/icons/resetPass";
import SaveIcon from "@/assets/icons/save_icon";
import EyeOpen from "@/assets/login_icon/eyeOpen";
import EyeClose from "@/assets/login_icon/eyecrossed";
type setting = {
  [key: string]: string;
  username: string;
  password: string;
  confirmPassword: string;
};

function SettingPage() {
  const settingData = useRef<setting | null>(null);

  const [show, setshow] = useState(false);

  function handleCHange(field: keyof setting, value: string) {
    if (settingData.current) {
      settingData.current[field] = value;
    }
  }

  async function UpdateAdminData() {
    const req = fetch("");
  }

  return (
    <section className={style.wraper}>
      <section className={style.iner_wraper}>
        <div className={style.head}>
          <h1>تغير اسم المستخدم و كلمة السر</h1>
          <ReseTIcon color={"white"} size={"50px"} />
        </div>

        <section className={style.input_group}>
          <input
            id="username"
            autoComplete="off"
            required
            onChange={(e) => handleCHange("username", e.target.value)}
            type="text"
          />
          <label htmlFor="username">إسم المستخدم</label>

          <input
            id="password"
            required
            autoComplete="off"
            onChange={(e) => handleCHange("password", e.target.value)}
            type={show ? "text" : "password"}
          />
          <label htmlFor="password">كلمة السر</label>
          <div className={style.EyeIcon}>
            {show ? (
              <span onClick={() => setshow((prv) => !prv)}>
                <EyeClose size={"15px"} />
              </span>
            ) : (
              <span onClick={() => setshow((prv) => !prv)}>
                <EyeOpen size={"15px"} />
              </span>
            )}
          </div>

          <input
            required
            id="confirmPassword"
            autoComplete="off"
            onChange={(e) => handleCHange("confirmPassword", e.target.value)}
            type={show ? "text" : "password"}
          />
          <label htmlFor="confirmPassword">تأكيد كلمة السر</label>
          <button>
            <SaveIcon size={"15px"} color={"white"} />
            حفض
          </button>
        </section>
      </section>
    </section>
  );
}

export default SettingPage;
