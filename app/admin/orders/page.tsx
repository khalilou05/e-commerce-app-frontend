"use client";

import type { Order } from "@/api/OrderApi";
import type { wilayaData } from "@/api/wilayaApi";
import { getAllOrders } from "@/api/OrderApi";
import { phoneFormat } from "@/utils/phoneNformat";
import { useEffect, useRef, useState } from "react";
import CheckIcon from "@/assets/icons/check";
import TrashIcon from "@/assets/icons/trash";
import BanIcon from "@/assets/icons/ban";
import PenIcon from "@/assets/icons/pen";
import SaveIcon from "@/assets/icons/save_icon";
import style from "@/css/route/orderTable.module.css";
import Loading from "@/components/Loding";
import { getAllWilaya } from "@/api/wilayaApi";
import ErrorIcon from "@/assets/icons/error";
import EyeCrosed from "@/assets/login_icon/eyecrossed";
import EyeOpned from "@/assets/login_icon/eyeOpen";
import OpenTab from "@/assets/icons/openTab";

type status = "loading" | "error" | "done";

function OrderTable() {
  const [allowFetch, setAllowFetch] = useState(false);
  const [rowToEdit, setRowToEdit] = useState<number | null>(null);
  const [reqUrl, setReqUrl] = useState("order");
  const [showActButton, setShowActButton] = useState(false);
  const [orders, setorders] = useState<Order[] | null>(null);
  const [wilaya, setWilaya] = useState<wilayaData[] | null>();
  const [selectedOrders, setselectedOrders] = useState<number[]>([]);
  const [status, setStatus] = useState<status>("loading");
  const cntrlr = new AbortController();

  // get All orders
  useEffect(() => {
    (async () => {
      try {
        const reqOrder = await getAllOrders(cntrlr.signal, reqUrl);

        if (reqOrder != null) {
          setorders(reqOrder);
          setStatus("done");
        }
      } catch (err) {
        setTimeout(() => {
          setStatus("error");
        }, 1000);
      }
      return () => {
        cntrlr.abort();
      };
    })();
  }, [allowFetch]);
  // get shipping cost
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllWilaya();
        setWilaya(data);
      } catch (err) {}
    })();
  }, [allowFetch]);
  // update the selected row
  function handlRowchange(
    rowId: number,
    field: keyof Order,
    value: string | number | boolean
  ) {
    const updatedOrders = orders?.map((order) =>
      order.id === rowId ? { ...order, [field]: value } : order
    );

    if (updatedOrders != undefined) {
      setorders(updatedOrders);
    }
  }
  // open new window for article
  function openPopUp(orderId: number) {
    const newPopUp = window.open(
      `http://localhost:3000/article/${orderId}`,
      "_blank"
    );
  }

  if (status === "loading")
    return (
      <section className={style.wraper}>
        <Loading size="50px" />
      </section>
    );
  if (status === "error")
    return (
      <section className={style.wraper}>
        <ErrorIcon size={100} />
      </section>
    );

  return (
    <section className={style.wraper}>
      <div className={style.table_wraper}>
        <div className={style.top_tab_wraper}>
          <div className={style.action_button_group}>
            <span>
              <p>{selectedOrders.length}</p>
              <p>طلبية محددة</p>
            </span>
            <div className={style.btn_wraper}>
              <span title="تأكيد الكل">
                <CheckIcon />
              </span>
              <span title="">
                <BanIcon />
              </span>
              <span title="">
                <TrashIcon />
              </span>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  onChange={() => {
                    const artId = orders?.map((art) => art.id);

                    if (artId != undefined) {
                      if (selectedOrders.length == orders?.length) {
                        setselectedOrders([]);
                        return;
                      }
                      setselectedOrders(artId);
                    }
                  }}
                  checked={
                    selectedOrders.length == orders?.length ? true : false
                  }
                  type="checkbox"
                />
              </th>
              <th>رقم الهاتف</th>
              <th>الإسم الكامل</th>
              <th>الولاية</th>
              <th>البلدية</th>
              <th>المنتج</th>
              <th>الكمية</th>
              <th>سعر المنتج</th>
              <th>سعر التوصيل</th>
              <th>مكان التوصيل</th>
              <th>تاريخ الطلب</th>
              <th>
                <button onClick={() => setShowActButton((prv) => !prv)}>
                  {showActButton ? <EyeOpned /> : <EyeCrosed />}
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td>
                  <input
                    checked={!!selectedOrders.includes(order.id)}
                    onChange={() => {
                      setselectedOrders((prev) => {
                        const inprvList = prev.includes(order.id);
                        if (inprvList)
                          return [...prev].filter((itm) => itm != order.id);
                        return [...prev, order.id];
                      });
                    }}
                    type="checkbox"
                  />
                </td>
                <td>{phoneFormat(order.phone_number)}</td>
                <td>
                  {rowToEdit === order.id ? (
                    <input
                      type="text"
                      value={order.full_name}
                      onChange={(e) =>
                        handlRowchange(order.id, "full_name", e.target.value)
                      }
                    />
                  ) : (
                    order.full_name
                  )}
                </td>
                <td>
                  {rowToEdit === order.id ? (
                    <select
                      onChange={(e) => {
                        const getUpdateprice = wilaya?.find(
                          (witem) => witem.wilaya === e.target.value
                        );
                        handlRowchange(
                          order.id,
                          "home_price",
                          getUpdateprice?.home_price || 0
                        );
                        handlRowchange(
                          order.id,
                          "desk_price",
                          getUpdateprice?.desk_price || 0
                        );
                        handlRowchange(order.id, "wilaya", e.target.value);
                      }}
                    >
                      <option>--إختر ولاية--</option>
                      {wilaya?.map((item) => (
                        <option
                          selected={item.wilaya === order.wilaya}
                          key={item.id}
                          value={item.wilaya}
                        >
                          {item.wilaya_code}
                          &nbsp; &nbsp;
                          {item.wilaya}
                        </option>
                      ))}
                    </select>
                  ) : (
                    order.wilaya
                  )}
                </td>
                <td>
                  {rowToEdit === order.id ? (
                    <input
                      type="text"
                      value={order.baladiya}
                      onChange={(e) =>
                        handlRowchange(order.id, "baladiya", e.target.value)
                      }
                    />
                  ) : (
                    order.baladiya
                  )}
                </td>

                <td onClick={() => openPopUp(order.article_id)}>
                  <OpenTab />
                </td>
                <td>
                  {rowToEdit === order.id ? (
                    <input
                      type="text"
                      value={order.quantity}
                      onChange={(e) =>
                        handlRowchange(order.id, "quantity", e.target.value)
                      }
                    />
                  ) : (
                    order.quantity
                  )}
                </td>
                <td>
                  {order.price}
                  &nbsp; دج
                </td>
                <td>
                  {order.home_dilevery ? order.home_price : order.desk_price}
                  &nbsp; دج
                </td>
                <td>
                  {rowToEdit === order.id ? (
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value == "المكتب") {
                          handlRowchange(order.id, "home_dilevery", false);
                          return;
                        }
                        handlRowchange(order.id, "home_dilevery", true);
                      }}
                    >
                      <option>--إختر التوصيل--</option>

                      <option
                        selected={order.home_dilevery ? true : false}
                        value={"المنزل"}
                      >
                        المنزل
                      </option>
                      <option selected={!order.home_dilevery} value={"المكتب"}>
                        المكتب
                      </option>
                    </select>
                  ) : order.home_dilevery ? (
                    "المنزل"
                  ) : (
                    "المكتب"
                  )}
                </td>

                <td>{order.order_date}</td>
                <td
                  style={{
                    width: showActButton ? "70px" : "30px",
                  }}
                >
                  {showActButton ? (
                    <div>
                      <button title="تأكيد الطلبية">
                        <CheckIcon />
                      </button>
                      <button
                        title="تعديل الطلبية"
                        onClick={() =>
                          rowToEdit === order.id
                            ? setRowToEdit(null)
                            : setRowToEdit(order.id)
                        }
                      >
                        {rowToEdit === order.id ? <SaveIcon /> : <PenIcon />}
                      </button>
                      <button title="حظر رقم الهاتف">
                        <BanIcon />
                      </button>
                      <button title="حذف الطلبية">
                        <TrashIcon />
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: orders?.length ? "none" : "flex",
        }}
        className={style.empty_order_msg}
      >
        لاتوجد طلبيات
      </div>
    </section>
  );
}

export default OrderTable;
