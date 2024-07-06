"use client";
import React, { useEffect, useState } from "react";
import Loding from "@/components/Loding";
import style from "@/css/route/shipping.module.css";
import SaveIcon from "@/assets/icons/save_icon.js";
import ErrorIcon from "@/assets/icons/error.js";
import { SERVER_IP } from "../../../settings.js";
type wilayaData = {
  id: number;
  wilaya: string;
  wilaya_code: string;
  desk_price: number;
  home_price: number;
  active: boolean;
};

function ShippingPage() {
  const [wilaya, setwilaya] = useState<wilayaData[] | undefined>();
  const [status, setstatus] = useState("loading");
  const [btnLoading, setBtnLoading] = useState(false);
  const abortcntrl = new AbortController();

  async function updateShippingCost() {
    const res = await fetch(`${SERVER_IP}/shipping/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wilaya),
    });
    if (res.status === 200) {
      setTimeout(() => {
        setBtnLoading(false);
      }, 300);
      return;
    }
  }
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${SERVER_IP}/shipping`, {
          signal: abortcntrl.signal,
        });
        if (res.status === 200) {
          const data = await res.json();
          setwilaya(data);
          setstatus("done");
          return;
        }
        setstatus("error");
      } catch (error) {
        setTimeout(() => {
          setstatus("error");
        }, 1000);
      }
    })();
    return () => abortcntrl.abort();
  }, []);

  if (status === "loading") {
    return (
      <section className={style.wraper}>
        <Loding
          size="100px"
          borderWidth="10px"
          borderColor="var(--side-bar-bgColor)"
          borderTopColor="var(--accent-color)"
        />
      </section>
    );
  }
  if (status === "error") {
    return (
      <section className={style.wraper}>
        <ErrorIcon size={100} />
        <p
          style={{
            color: "#A91D3A",
            fontWeight: "bold",
            position: "absolute",
            top: "60%",
          }}
        >
          الخادم لا يستجيب
        </p>
      </section>
    );
  }
  return (
    <section className={style.wraper}>
      <div className={style.table__wraper}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>الولاية</th>
              <th>سعر التوصيل للمكتب</th>
              <th>سعر التوصيل للمنزل</th>
              <th>تفعيل</th>
            </tr>
          </thead>
          <tbody>
            {wilaya?.map((item) => (
              <tr key={item.id}>
                <td>{item.wilaya_code}</td>
                <td>{item.wilaya}</td>
                <td>
                  <input
                    type="text"
                    value={item.desk_price}
                    onChange={(e) =>
                      setwilaya((prevWil) => {
                        const updatedArray = prevWil?.map((prvit) =>
                          item.id === prvit.id
                            ? {
                                ...prvit,
                                desk_price: Number(e.target.value) || 0,
                              }
                            : prvit
                        );

                        return updatedArray;
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.home_price}
                    onChange={(e) =>
                      setwilaya((prevWil) => {
                        const updatedArray = prevWil?.map((prvit) =>
                          item.id === prvit.id
                            ? {
                                ...prvit,
                                home_price: Number(e.target.value) || 0,
                              }
                            : prvit
                        );

                        return updatedArray;
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.active}
                    title="إزالة أو تفعيل الشحن للولاية"
                    onChange={() =>
                      setwilaya((prevWil) => {
                        const updatedArray = prevWil?.map((prvit) =>
                          item.id === prvit.id
                            ? { ...prvit, active: !prvit.active }
                            : prvit
                        );

                        return updatedArray;
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        onClick={() => {
          setBtnLoading(true);
          updateShippingCost();
        }}
        className={style.save_button}
      >
        {btnLoading === true ? (
          <Loding
            size="15px"
            borderWidth="2px"
            borderColor="gray"
            borderTopColor="white"
          />
        ) : (
          <SaveIcon color={"white"} size={"15px"} />
        )}
        حفظ
      </div>
    </section>
  );
}

export default ShippingPage;
