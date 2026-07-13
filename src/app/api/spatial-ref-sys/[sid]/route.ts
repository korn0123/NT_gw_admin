import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ srid: string }> }
) {
  try {
    const token = request.headers.get("Authorization");

    const { srid } = await params;

    const response = await fetch(
      `https://innogw.ntplc.co.th/spatial-ref-sys/${srid}`,
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