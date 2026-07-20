import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("Authorization");

    const { id } = await params;

    const response = await fetch(
      `https://innogw.ntplc.co.th/user/${id}`,
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("Authorization");
    const { id } = await params;

    const body = await request.json();

    const response = await fetch(`https://innogw.ntplc.co.th/user/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

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
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("Authorization");
    const { id } = await params;

    const response = await fetch(`https://innogw.ntplc.co.th/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      // กรณี API ไม่ส่ง body กลับมา
    }

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
      { status: 500 }
    );
  }
}