"use client";
import React, { useEffect, useState } from "react";
import Loding from "@/components/Loding";
import style from "@/css/route/shipping.module.css";
import SaveIcon from "@/assets/icons/save_icon.js";
import ErrorIcon from "@/assets/icons/error.js";
import { SERVER_IP } from "@/constant";
type wilayaData = {
  id: number;
  wilaya: string;
  desk_price: number;
  home_price: number;
  active: boolean;
};

function ShippingPage() {
  const [wilaya, setwilaya] = useState<wilayaData[]>();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  async function updateShippingCost() {
    const res = await fetch(`${SERVER_IP}/shipping/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wilaya),
    });
    return res.json();
  }
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${SERVER_IP}/shipping`);
        if (res.ok) {
          const data = await res.json();
          setwilaya(data);
          setloading(false);
        }
      } catch (error) {
        seterror(true);
        setTimeout(() => {
          setloading(false);
        }, 1000);
      }
    })();
  }, []);

  if (loading) {
    return (
      <section className={style.wraper}>
        <Loding border="10" size="100px" />
      </section>
    );
  }
  if (error) {
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
                <td>{item.id}</td>
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
      <div onClick={updateShippingCost} className={style.save_button}>
        <SaveIcon color={"white"} size={"15px"} />
        حفظ
      </div>
    </section>
  );
}

export default ShippingPage;
