import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ order_ref: string }> }
) {
  try {
    const token = request.headers.get("Authorization");

    const { order_ref } = await params;

    const response = await fetch(
      `https://innogw.ntplc.co.th/api/search-order-ref/${order_ref}`,
      {
        method: "GET",
        headers: {
          Authorization: token ?? "",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    console.log("BACKEND RESPONSE");
    console.log(JSON.stringify(data, null, 2));

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error,
      },
      {
        status: 500,
      }
    );
  }
}