"use client";

import type { Order } from "@/api/OrderApi";
import { wilayaData, getBaladiya, baladiyaItem } from "@/api/wilayaApi";
import { getAllOrders } from "@/api/OrderApi";
import { phoneFormat } from "@/utils/phoneNformat";
import { useEffect, useState } from "react";
import CheckIcon from "@/assets/icons/check";
import TrashIcon from "@/assets/icons/trash";
import BanIcon from "@/assets/icons/ban";
import PenIcon from "@/assets/icons/pen";
import SaveIcon from "@/assets/icons/save_icon";
import style from "@/css/route/orderTable.module.css";
import Loding from "@/components/Loding";
import { getAllWilaya } from "@/api/wilayaApi";
import ErrorIcon from "@/assets/icons/error";
import EyeCrosed from "@/assets/login_icon/eyecrossed";
import EyeOpned from "@/assets/login_icon/eyeOpen";

type status = "loading" | "error" | "done";

function OrderTable() {
  const [allowFetch, setAllowFetch] = useState(false);
  const [rowToEdit, setRowToEdit] = useState<number | null>(null);
  const [slectedWilaya, setslectedWilaya] = useState<number | null>(null);
  const [baladia, setBaladiya] = useState<baladiyaItem[] | null>();
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
        const reqOrder = await getAllOrders(cntrlr.signal);
        if (reqOrder != null) {
          setorders(reqOrder);
          setStatus("done");
          return;
        }
        setStatus("error");
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
  useEffect(() => {
    (async () => {
      try {
        const data = await getBaladiya();
        const filtredWil = data?.find(
          (item) => item.wilaya_code === slectedWilaya
        );

        setBaladiya(filtredWil?.baladiya);
      } catch (err) {}
    })();
  }, [slectedWilaya]);
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

  if (status === "loading")
    return (
      <section className={style.wraper}>
        <Loding border="10" size="100px" />
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
                تأكيد
                <CheckIcon />
              </span>
              <span title="">
                حظر
                <BanIcon size={"15px"} color={"white"} />
              </span>
              <span title="" onClick={() => console.log(baladia)}>
                حذف
                <TrashIcon />
              </span>
            </div>
          </div>
          <div className={style.command_type}>
            <div>طلبيات غير مأكدة</div>
            <div>طلبيات مأكدة</div>
          </div>
          <div className={style.datePicker}>
            {/* <input
              onChange={(e) => console.log(e.target.value)}
              id="date"
              type="date"
            /> */}
            {/* <label htmlFor="date">x</label> */}
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
                  {showActButton ? (
                    <EyeOpned color={"white"} size={"15px"} />
                  ) : (
                    <EyeCrosed color={"white"} size={"15px"} />
                  )}
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
                        setslectedWilaya(Number(e.target.value));
                        const getUpdateprice = wilaya?.find(
                          (witem) => witem.wilaya_code === e.target.value
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
                        handlRowchange(
                          order.id,
                          "wilaya",
                          getUpdateprice?.wilaya || order.wilaya
                        );
                      }}
                    >
                      <option>--إختر ولاية--</option>
                      {wilaya?.map((item) => (
                        <option key={item.id} value={item.wilaya_code}>
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
                    <select
                      onChange={(e) => {
                        handlRowchange(order.id, "baladiya", e.target.value);
                      }}
                    >
                      <option>--إختر بلدية--</option>

                      {baladia?.map((item) => (
                        <option key={item.id}>{item.baladiya_name}</option>
                      ))}
                    </select>
                  ) : (
                    order.baladiya
                  )}
                </td>

                <td>{order.reference}</td>
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
                      defaultValue={order.home_dilevery ? "المنزل" : "المكتب"}
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
                        // selected={order.home_dilevery ? true : false}
                        value={"المنزل"}
                      >
                        المنزل
                      </option>
                      <option
                        // selected={!order.home_dilevery}
                        value={"المكتب"}
                      >
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
                      <button
                        title="تعديل الطلبية"
                        onClick={() =>
                          rowToEdit === order.id
                            ? setRowToEdit(null)
                            : setRowToEdit(order.id)
                        }
                      >
                        {rowToEdit === order.id ? (
                          <SaveIcon color={"#53a20e"} size={"15px"} />
                        ) : (
                          <PenIcon />
                        )}
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
