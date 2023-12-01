// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { signOut, useSession } from "next-auth/react";

// export function middleware(request: NextRequest) {
//     const { data: session }: any = useSession();

//   if (request.nextUrl.pathname.startsWith('/about')) {
//     return NextResponse.rewrite(new URL('/about-2', request.url))
//   }
 
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//   }
// }