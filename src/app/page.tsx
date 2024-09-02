"use client";

import TempChart from "@/components/ui/tempChart";

export default function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2
        className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
        style={{ marginBottom: "120px", marginTop: "80px" }}
      >
          Climate Gartenstraße
      </h2>
      <TempChart />
    </div>
  );
}
