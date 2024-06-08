"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export function GeminiKeyInput() {
  const [apiKey, setApiKey] = useState("");
  const router = useRouter()

  function saveKey() {
    localStorage.setItem("apiKey", apiKey);
    router.push("/emails");
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Input
          type="text"
          placeholder="xxxxxxxxxxxxxxxxx"
          required
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" onClick={saveKey}>
        Classify your mails
      </Button>
    </div>
  );
}
