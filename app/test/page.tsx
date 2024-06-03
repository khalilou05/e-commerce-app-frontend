"use client";
import React from "react";
import Sidebar from "@/components/sidebar";
import Loding from "@/components/Loding";
import CheckBox from "@/components/checkbox";
function Test() {
  async function getBaladiya() {
    const baladiya = fetch("/algeria_cities3.json");

    console.log((await baladiya).json());
  }
  getBaladiya();
  return (
    <section>
      <Loding size="200px" border="8" />
    </section>
  );
}

export default Test;
/* HTML: <div class="loader"></div> */
