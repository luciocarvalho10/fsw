"use client";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function FSWDonalds() {
  const restaurant = () => redirect("/fsw-donalds");
  return (
    <Button variant="secondary" onClick={restaurant}>
      IR PARA A APLICAÇÃO
    </Button>
  );
}
