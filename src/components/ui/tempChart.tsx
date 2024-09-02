"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import { Button } from "@/components/ui/button";

import { format } from "date-fns";

const CustomizedDot = (props: { cx: number; cy: number; value: number }) => {
  const { cx, cy, value } = props;
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={10}
      fill='#FFFFFF'
      stroke='#808080'
      strokeWidth={4}
    />
  );
};

export default function TempChart() {
  const [data, setData] = React.useState([]);
  const [selectedPeriod, setSelectedPeriod] = React.useState("24H");

  React.useEffect(() => {
    async function fetchData(period: string) {
      var url = "/api/temperature";
      if (period === "Monthly") {
        url = "/api/temperatureMonth";
      } else if (period === "Quarterly") {
        url = "/api/temperatureQuarter";
      } else if (period === "Yearly") {
        url = "/api/temperatureYear";
      }
      const response = await fetch(url);
      if (response.ok) {
        const temperatureData = await response.json();
        console.log(temperatureData);
        // Format the createdAt field
        const formattedData = temperatureData.map((item: any) => ({
          ...item,
          createdAt: format(new Date(item.createdAt), "MM-dd HH:mm"),
        }));
        setData(formattedData);
      } else {
        console.error("Failed to fetch data");
      }
    }
    fetchData(selectedPeriod);
  }, [selectedPeriod]);

  const handleButtonClick = (period: string) => {
    setSelectedPeriod(period);
    // Fetch data based on the selected period
    // fetchData(period);
  };

  return (
    <>
      <div className='button-container' style={{ marginBottom: "70px" }}>
        <Button
          variant={selectedPeriod === "24H" ? undefined : "secondary"}
          onClick={() => handleButtonClick("24H")}
        >
          24H
        </Button>
        <Button
          variant={selectedPeriod === "Monthly" ? undefined : "secondary"}
          onClick={() => handleButtonClick("Monthly")}
        >
          Monthly
        </Button>
        <Button
          variant={selectedPeriod === "Quarterly" ? undefined : "secondary"}
          onClick={() => handleButtonClick("Quarterly")}
        >
          Quarterly
        </Button>
        <Button
          variant={selectedPeriod === "Yearly" ? undefined : "secondary"}
          onClick={() => handleButtonClick("Yearly")}
        >
          Yearly
        </Button>
      </div>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={data}>
          <defs>
            <linearGradient id='tempGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#FF4500' stopOpacity={1} />{" "}
              {/* Red color for > 27°C */}
              <stop offset='50%' stopColor='#FFD700' stopOpacity={1} />{" "}
              {/* Yellowish color for > 22°C */}
              <stop offset='100%' stopColor='#ADD8E6' stopOpacity={1} />{" "}
              {/* Light blue for ≤ 22°C */}
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='4 29' vertical={false} />
          <XAxis
            dataKey='createdAt'
            axisLine={false}
            padding={{ left: 15, right: 15 }}
            tick={{ fontSize: "12px" }}
            style={{ fontSize: "12px" }}
          />
          <YAxis
            tickLine={false}
            tickFormatter={(value) => `${value}°C`}
            axisLine={false}
            style={{ fontSize: "12px" }}
            ticks={[0, 10, 20, 30]} // Only 4 steps in y axis
          />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='temperature'
            stroke='url(#tempGradient)'
            fillOpacity={0} // Makes the area transparent
            strokeWidth={14}
            dot={<CustomizedDot cx={0} cy={0} value={0} />}
          />
        </LineChart>
      </ResponsiveContainer>
      <style jsx>{`
        .button-container {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}
