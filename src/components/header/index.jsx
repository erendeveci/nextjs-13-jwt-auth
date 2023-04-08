"use client";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";

export  function Header() {
  const auth = useAuth();
  console.log(auth);
  return (
    <header>
      <div>
        <Link href="/">Logo</Link>
      </div>
      <nav>
        <Link href="/panel">Panel (Protected Route)</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
