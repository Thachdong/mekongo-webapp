import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { axiosServer } from "@/shared-libs/axios/server";

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const accessToken = (await cookies()).get("accessToken")?.value;
  const hasBody = !["GET", "HEAD"].includes(request.method);

  try {
    const response = await axiosServer.request({
      url: `/${path.join("/")}${request.nextUrl.search}`,
      method: request.method,
      data: hasBody ? await request.json().catch(() => undefined) : undefined,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
