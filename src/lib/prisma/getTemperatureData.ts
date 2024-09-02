import { prisma } from "./prisma";
import {
  startOfWeek,
  subWeeks,
  subMonths,
  startOfMonth,
  subYears,
  startOfYear,
} from "date-fns";

export async function getTemperatureDataLast7Days() {
  const data = await prisma.log.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    select: {
      temperature: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function getTemperatureDataLastDay() {
  const data = await prisma.log.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    },
    select: {
      temperature: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function getTemperatureDataLast4Weeks() {
  const data = await prisma.log.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 28)),
      },
    },
    select: {
      temperature: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Initialize an array to hold the aggregated data for each week
  const aggregatedData = [
    {
      createdAt: startOfWeek(subWeeks(new Date(), 3)),
      totalTemperature: 0,
      count: 0,
    },
    {
      createdAt: startOfWeek(subWeeks(new Date(), 2)),
      totalTemperature: 0,
      count: 0,
    },
    {
      createdAt: startOfWeek(subWeeks(new Date(), 1)),
      totalTemperature: 0,
      count: 0,
    },
    { createdAt: startOfWeek(new Date()), totalTemperature: 0, count: 0 },
  ];

  // Get the current date
  const currentDate = new Date();

  // Iterate over the fetched data and aggregate it by week
  data.forEach((entry: any) => {
    const entryDate = new Date(entry.createdAt);
    const daysDifference = Math.floor(
      (currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weekIndex = Math.floor(daysDifference / 7);

    if (weekIndex < 4) {
      aggregatedData[weekIndex].totalTemperature += entry.temperature;
      aggregatedData[weekIndex].count += 1;
    }
  });

  // Calculate the average temperature for each week
  const result = aggregatedData.map((weekData) => ({
    temperature:
      weekData.count > 0 ? weekData.totalTemperature / weekData.count : 0,
    createdAt: weekData.createdAt,
  }));

  return result;
}

export async function getTemperatureDataLast3Months() {
  const data = await prisma.log.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 3)),
      },
    },
    select: {
      temperature: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Initialize an array to hold the aggregated data for each month
  const aggregatedData = [
    {
      createdAt: startOfMonth(subMonths(new Date(), 2)),
      totalTemperature: 0,
      count: 0,
    },
    {
      createdAt: startOfMonth(subMonths(new Date(), 1)),
      totalTemperature: 0,
      count: 0,
    },
    { createdAt: startOfMonth(new Date()), totalTemperature: 0, count: 0 },
  ];

  // Get the current date
  const currentDate = new Date();

  // Iterate over the fetched data and aggregate it by month
  data.forEach((entry:any) => {
    const entryDate = new Date(entry.createdAt);
    const monthsDifference =
      currentDate.getMonth() -
      entryDate.getMonth() +
      12 * (currentDate.getFullYear() - entryDate.getFullYear());
    const monthIndex = monthsDifference;

    if (monthIndex < 3) {
      aggregatedData[monthIndex].totalTemperature += entry.temperature;
      aggregatedData[monthIndex].count += 1;
    }
  });

  // Calculate the average temperature for each month
  const result = aggregatedData.map((monthData) => ({
    temperature:
      monthData.count > 0 ? monthData.totalTemperature / monthData.count : 0,
    createdAt: monthData.createdAt,
  }));

  return result;
}

export async function getTemperatureDataLastYear() {
  const data = await prisma.log.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      },
    },
    select: {
      temperature: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Initialize an array to hold the aggregated data for each month
  const aggregatedData = Array.from({ length: 12 }, (_, i) => ({
    createdAt: startOfMonth(subMonths(new Date(), 11 - i)),
    totalTemperature: 0,
    count: 0,
  }));

  // Get the current date
  const currentDate = new Date();

  // Iterate over the fetched data and aggregate it by month
  data.forEach((entry:any) => {
    const entryDate = new Date(entry.createdAt);
    const monthsDifference =
      currentDate.getMonth() -
      entryDate.getMonth() +
      12 * (currentDate.getFullYear() - entryDate.getFullYear());
    const monthIndex = monthsDifference;

    if (monthIndex < 12) {
      aggregatedData[monthIndex].totalTemperature += entry.temperature;
      aggregatedData[monthIndex].count += 1;
    }
  });

  // Calculate the average temperature for each month
  const result = aggregatedData.map((monthData) => ({
    temperature:
      monthData.count > 0 ? monthData.totalTemperature / monthData.count : 0,
    createdAt: monthData.createdAt,
  }));

  return result;
}
