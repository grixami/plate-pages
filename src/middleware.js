import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = request.cookies.get("token")

    if (token == null) {
        return NextResponse.redirect(new URL("/auth/signin", request.url))
    }

    return NextResponse.next()
}
export const config = {
  matcher: [
    "/:path",
    "/dashboard/:path"
  ],
}