"use client";

import {
  Order,
  getOrdersCount,
  setOrderCONFIRMED,
  changeOrderStatus,
  addToBlackilist,
  removeOrder,
} from "@/api/OrderApi";
import { wilayaData, getBaladiya, baladiyaItem } from "@/api/wilayaApi";
import { getAllOrders } from "@/api/OrderApi";
import { phoneFormat } from "@/utils/phoneNformat";
import { ChangeEvent, useEffect, useState } from "react";
import CheckIcon from "@/assets/icons/check";
import TrashIcon from "@/assets/icons/trash";
import BanIcon from "@/assets/icons/ban";
import PenIcon from "@/assets/icons/pen";
import SaveIcon from "@/assets/icons/save_icon";
import style from "@/css/route/orderTable.module.css";
import Loding from "@/components/Loding";
import { getAllWilaya } from "@/api/wilayaApi";
import ErrorIcon from "@/assets/icons/error";
import RefreshIcon from "@/assets/icons/refresh";
import EyeCrosed from "@/assets/login_icon/eyecrossed";

import EyeOpned from "@/assets/login_icon/eyeOpen";
import MissedCallIcon from "@/assets/icons/missedcall";
import Link from "next/link";

type status = "loading" | "error" | "done";

function OrderTable() {
  const [dateFilter, setDateFilter] = useState<string>("");
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const [orderType, setOrderType] = useState<string>("none");
  const [ordersCount, setOrderCount] = useState<number>(0);
  const [rowToEdit, setRowToEdit] = useState<number | null>(null);
  const [slectedWilaya, setslectedWilaya] = useState<number | null>(null);
  const [baladia, setBaladiya] = useState<baladiyaItem[] | null>();
  const [showActButton, setShowActButton] = useState(false);
  const [orders, setorders] = useState<Order[] | null>(null);
  const [wilaya, setWilaya] = useState<wilayaData[] | null>();
  const [selectedOrders, setselectedOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<status>("loading");

  // get All orders
  useEffect(() => {
    const cntrlr = new AbortController();
    (async () => {
      try {
        const reqOrder = await getAllOrders(
          dateFilter,
          orderType,
          offset,
          limit,
          cntrlr.signal
        );
        if (reqOrder !== undefined) {
          setorders(reqOrder);
          setStatus("done");
          return;
        }
        setStatus("error");
      } catch (err) {
        console.log(err);

        setTimeout(() => {
          setStatus("error");
        }, 1000);
      }
    })();
    return () => {
      cntrlr.abort();
    };
  }, [orderType, dateFilter, offset, orders?.length, refresh]);

  // get orders count
  useEffect(() => {
    (async () => {
      try {
        const data = await getOrdersCount(orderType);
        setOrderCount(data || 0);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [orderType, orders?.length]);
  // get shipping cost
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllWilaya();
        setWilaya(data);
      } catch (err) {}
    })();
  }, []);
  // update baladiya select acording to wilaya
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

  function handlOrderTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    setOrderType(e.target.value);

    setselectedOrders([]);
    setOffset(0);
    setPage(1);
  }

  function handlChnageOrderStatus(status: string) {
    if (!selectedOrders.length) return;
    changeOrderStatus(status, selectedOrders);
    if (orders) {
      const newOrders = orders.filter(
        (order) => !selectedOrders.includes(order)
      );
      setorders(newOrders);
      setselectedOrders([]);
    }
  }

  if (status === "loading")
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
  if (status === "error")
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

  return (
    <section className={style.wraper}>
      <section className={style.iner_wraper}>
        <div className={style.top_bar_wraper}>
          <div className={style.right_sec}>
            <div
              style={{
                visibility: orderType === "done" ? "hidden" : "visible",
              }}
              className={style.action_button_group}
            >
              <span>
                <p>{selectedOrders.length}</p>
                <p>طلبية محددة</p>
              </span>
              <div className={style.btn_wraper}>
                {orderType === "confirmed" ? (
                  <span
                    onClick={() => {
                      handlChnageOrderStatus("shipped");
                    }}
                    style={{
                      width: "70px",
                    }}
                  >
                    تم الشحن
                    <CheckIcon />
                  </span>
                ) : orderType === "shipped" ? (
                  <span
                    onClick={() => {
                      handlChnageOrderStatus("done");
                    }}
                    style={{
                      width: "100px",
                    }}
                  >
                    تم الإسـتـلام
                    <CheckIcon />
                  </span>
                ) : (
                  <span
                    onClick={async () => {
                      if (orders && selectedOrders.length) {
                        const isConfirmed = await setOrderCONFIRMED(
                          selectedOrders
                        );
                        if (isConfirmed) {
                          const newOrders = orders.filter(
                            (order) => !selectedOrders.includes(order)
                          );
                          setorders(newOrders);
                          setselectedOrders([]);
                          return;
                        }
                        setOffset(0);
                        setselectedOrders([]);
                      }
                    }}
                    style={{
                      display:
                        orderType === "canceled"
                          ? "none"
                          : orderType === "shipped"
                          ? "none"
                          : "flex",
                    }}
                    title="تأكيد الكل"
                  >
                    تأكيد
                    <CheckIcon />
                  </span>
                )}

                <span
                  style={{
                    display:
                      orderType === "confirmed"
                        ? "none"
                        : orderType === "shipped"
                        ? "none"
                        : orderType === "missing_call"
                        ? "none"
                        : orderType === "canceled"
                        ? "none"
                        : "flex",
                  }}
                  title=""
                  onClick={() => handlChnageOrderStatus("missing_call")}
                >
                  لا يرد
                  <MissedCallIcon />
                </span>
                <span
                  onClick={() => {
                    // todo
                    if (!selectedOrders.length) return;

                    addToBlackilist(selectedOrders);
                    removeOrder(selectedOrders);
                    if (orders) {
                      const newOrders = orders.filter(
                        (order) => !selectedOrders.includes(order)
                      );
                      setorders(newOrders);
                      setselectedOrders([]);
                    }
                  }}
                  style={{
                    display:
                      orderType === "confirmed"
                        ? "none"
                        : orderType === "shipped"
                        ? "none"
                        : "flex",
                  }}
                  title=""
                >
                  حظر
                  <BanIcon size={"15px"} color={"white"} />
                </span>
                {orderType === "shipped" ? (
                  <span
                    onClick={() => handlChnageOrderStatus("canceled")}
                    style={{
                      width: "100px",
                    }}
                  >
                    لم يتم الإستلام
                  </span>
                ) : (
                  <span
                    style={{
                      display: orderType === "confirmed" ? "none" : "flex",
                    }}
                    title=""
                    onClick={() => {
                      if (!selectedOrders.length) return;

                      removeOrder(selectedOrders);

                      if (orders) {
                        const newOrders = orders.filter(
                          (order) => !selectedOrders.includes(order)
                        );
                        setorders(newOrders);
                        setselectedOrders([]);
                      }
                    }}
                  >
                    حذف
                    <TrashIcon />
                  </span>
                )}
              </div>
            </div>
            <div
              onClick={() => setRefresh((prv) => !prv)}
              className={style.refresh}
            >
              تحديث
              <RefreshIcon />
            </div>
          </div>
          <div className={style.left_sec}>
            <div className={style.order_type}>
              <select onChange={handlOrderTypeChange}>
                <option value="none">طلبيات غير مأكدة &nbsp;🕒</option>
                <option value="confirmed">
                  طـلـبيـات مأكـدة &nbsp;&nbsp;✅
                </option>
                <option value="shipped">
                  تــم الــشــحــن &nbsp;&nbsp;&nbsp;🚛
                </option>
                <option value="done">
                  تــم الإسـتـلام &nbsp;&nbsp;&nbsp;💰🤑
                </option>
                <option value="missing_call">
                  لـــم يــتــم الرد &nbsp;&nbsp;&nbsp;📵
                </option>
                <option value="canceled">
                  لـم يتم الإسـتـلام &nbsp;&nbsp;❌
                </option>
              </select>
            </div>

            <div className={style.date_inpt}>
              <input
                onChange={(e) => {
                  setDateFilter(e.target.value || "");
                }}
                onClick={(e) => {
                  e.currentTarget.showPicker();
                }}
                type="date"
              />
            </div>
            <div className={style.pagination}>
              <button
                style={{
                  visibility: page === 1 ? "hidden" : "visible",
                }}
                onClick={() => {
                  setOffset((prv) => (prv - 50 <= 0 ? 0 : prv - 50));
                  setPage((prv) => (prv === 1 ? 1 : prv - 1));
                  setselectedOrders([]);
                }}
              >
                ➡︎
              </button>
              <p>صفحة</p>
              <p>{page}</p>

              <button
                style={{
                  visibility: offset + 50 >= ordersCount ? "hidden" : "visible",
                }}
                onClick={() => {
                  setOffset((prv) =>
                    prv + 50 >= ordersCount ? prv : prv + 50
                  );
                  setPage((prv) =>
                    offset + 50 >= ordersCount ? prv : prv + 1
                  );
                  setselectedOrders([]);
                }}
              >
                ➡︎
              </button>
            </div>
            <div className={style.order_count}>
              <p>{ordersCount}</p>

              <p>إجمالي الطلبيات</p>
            </div>
          </div>
        </div>

        <div className={style.table_wraper}>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    style={{
                      visibility: orderType === "done" ? "hidden" : "visible",
                    }}
                    onChange={() => {
                      if (orders != undefined) {
                        if (selectedOrders.length == orders?.length) {
                          setselectedOrders([]);
                          return;
                        }
                        setselectedOrders(orders);
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
                <th>نوع التوصيل</th>
                <th>تاريخ الطلب</th>

                {orderType === "confirmed" ? (
                  <th>تاريخ التأكيد</th>
                ) : orderType === "shipped" ||
                  orderType === "canceled" ||
                  orderType === "done" ? (
                  <th>تاريخ الشحن</th>
                ) : (
                  <th
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        setShowActButton((prv) => !prv);
                      }}
                    >
                      {showActButton ? (
                        <EyeOpned size={"15px"} />
                      ) : (
                        <EyeCrosed size={"15px"} />
                      )}
                    </button>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {orders?.map((order) => (
                <tr key={order.id}>
                  <td>
                    <input
                      style={{
                        visibility: orderType === "done" ? "hidden" : "visible",
                      }}
                      checked={selectedOrders.includes(order)}
                      onChange={() => {
                        setselectedOrders((prev) => {
                          const inprvList = prev.includes(order);
                          if (inprvList)
                            return [...prev].filter((itm) => itm != order);
                          return [...prev, order];
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

                  <td>
                    <Link target="_blank" href={`/article/${order.article_id}`}>
                      {order.reference}
                    </Link>
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
                    {order.free_shipping
                      ? "0"
                      : order.home_dilevery
                      ? order.home_price
                      : order.desk_price}
                    &nbsp; دج
                  </td>
                  <td>
                    {rowToEdit === order.id ? (
                      <select
                        value={order.home_dilevery ? "المنزل" : "المكتب"}
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
                    ) : order.free_shipping ? (
                      "شحن مجاني"
                    ) : order.home_dilevery ? (
                      "المنزل"
                    ) : (
                      "المكتب"
                    )}
                  </td>

                  <td>{order.order_date}</td>
                  {orderType === "confirmed" ? (
                    <td>{order.confirmed_date}</td>
                  ) : orderType === "shipped" || orderType === "canceled" ? (
                    <td>{order.shipping_date}</td>
                  ) : (
                    <td
                      style={{
                        textAlign: "center",
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
                  )}
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
    </section>
  );
}

export default OrderTable;
