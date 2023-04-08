import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/libs/auth";
import { NextResponse } from "next/server";
export async function POST(request) {
  const body = await request.json();

  //database check
  if (body.username === "admin" && body.password === "admin") {
    //generate a token
    const token = await new SignJWT({
      username: body.username,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30s")
      .sign(getJwtSecretKey());

    //set the cookie
    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
    });

    //return the response
    return response;
  }

  return NextResponse.json({ success: false });
}
