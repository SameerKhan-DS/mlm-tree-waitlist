"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session }: any = useSession();

  const handleShareReferralLink = () => {
    const link = `http://localhost:3000/register?ref=${session.user?.email}`;
    navigator.clipboard.writeText(link);
    console.log("checked the URL", link);
  };
  return (
    <div>
      <ul className="flex justify-between m-10 item-center">
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
          
        </div>
        <div className="flex gap-10">
          <Link href="/tree">
            <li>Tree</li>
          </Link>
          {!session ? (
            <>
              <Link href="/production">
                <li>TOP CLASSEMENTS</li>
              </Link>
              <Link href="/register">
                <li>Register</li>
              </Link>
            </>
          ) : (
            <>
              {session.user?.email}
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {session && (
            <button onClick={handleShareReferralLink}>
              Generate Referral Link
            </button>
          )}
        </div>
        <div></div>
      </ul>
    </div>
  );
};

export default Navbar;