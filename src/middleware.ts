import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const PUBLIC_PATHS = ["/", "/menu", "/plans", "/about", "/login", "/signup", "/callback"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // POC: If Supabase not configured, allow all routes
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === "your-supabase-url"
  ) {
    return NextResponse.next();
  }

  // Public paths, no auth needed
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    const { supabaseResponse } = await updateSession(request);
    return supabaseResponse;
  }

  // API routes with their own auth
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  try {
    const { user, supabaseResponse } = await updateSession(request);

    // Not logged in, redirect to login
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch {
    // Supabase connection failed, allow through
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
