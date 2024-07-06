"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loding";
function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const route = useRouter();
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth") || false;
    if (!isAuth) {
      route.push("/login");
    }
    setisAuthenticated(!!isAuth);
  });

  if (isAuthenticated) {
    return (
      <section
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Sidebar />
        <section
          style={{
            overflow: "hidden",
            boxSizing: "border-box",
            height: "100vh",
            width: "100vw",
          }}
        >
          {children}
        </section>
      </section>
    );
  }
  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading width="100px" />
    </section>
  );
}

export default AdminLayout;
