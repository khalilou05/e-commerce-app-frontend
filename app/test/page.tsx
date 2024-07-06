"use client";
import React from "react";

import Loding from "@/components/Loding";

function Test() {
  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    >
      <Loding
        size="100px"
        borderWidth="10px"
        borderColor="var(--side-bar-bgColor)"
        borderTopColor="var(--accent-color)"
      />
    </section>
  );
}

export default Test;
/* HTML: <div class="loader"></div> */
