import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    const { nextUrl } = request;
    const absoluteUrl = `${nextUrl.protocol}//${nextUrl.host}/search`; // Construct the absolute URL

    return NextResponse.redirect(absoluteUrl);
}