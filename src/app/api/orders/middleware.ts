import { decodeJwtToken } from "@/utils/firebase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (
    auth &&
    typeof auth == "string" &&
    auth.split(" ").length == 2 &&
    auth.split(" ")[0] == "Bearer"
  ) {
    const token = auth.split(" ")[1];
    const user = await decodeJwtToken(token);
    request.headers.set("FIREBASE_USER", JSON.stringify(user));
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/orders/*",
};
