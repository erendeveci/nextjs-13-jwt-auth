"use client";

import { useRouter, useSearchParams } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const { success } = await res.json();
    console.log(success);

    if (success) {
      const nextUrl = searchParams.get("next");
      router.push(nextUrl ? nextUrl : `/`);
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
