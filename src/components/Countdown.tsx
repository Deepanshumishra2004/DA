"use client";
import { useEffect, useState } from "react";

const EXAM = new Date("2027-02-06T00:00:00+05:30");

export default function Countdown() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    setDays(Math.max(0, Math.ceil((EXAM.getTime() - Date.now()) / 86400000)));
  }, []);
  return <>{days ?? "…"}</>;
}
