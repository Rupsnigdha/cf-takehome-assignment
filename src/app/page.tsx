"use client";
import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/stores/counterStore";

export default function Home() {
  const counterStore = useCounterStore();
  return (
    <>
      <div>{counterStore.count}</div>
      <Button onClick={counterStore.increment}>+</Button>
    </>
  );
}
