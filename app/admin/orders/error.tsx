"use client"; // Error components must be Client Components

import { useEffect } from "react";
import style from "@/css/route/orderTable.module.css";
import ErrorIcon from "@/assets/icons/error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <section className={style.wraper}>
      <ErrorIcon size={100} />
      <p
        style={{
          fontSize: "30px",
          color: "#A91D3A",
        }}
      >
        حدث خطأ ما{" "}
      </p>
    </section>
  );
}
