import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");

    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      {
        method: "POST",
        headers: {
          Authorization: token ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}