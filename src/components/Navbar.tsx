"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status: sessionStatus }: any = useSession();

  const handleShareReferralLink = () => {
    const link = `http://localhost:3000/register?ref=${session.user?.email}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <div>
      <ul className="flex justify-between m-10 items-center">
        <div>
          <Link href="/">
            <li className="cursor-pointer">Home</li>
          </Link>
        </div>
        <div className="flex gap-10">
          <Link href="/tree">
            <li className="cursor-pointer">Tree</li>
          </Link>
          <Link href="/production">
            <li className="cursor-pointer">TOP CLASSEMENTS</li>
          </Link> 
          {!session ? (
            <>
              <Link href="/register">
                <li className="cursor-pointer">Register</li>
              </Link>
              <Link href="/login">
                <li className="cursor-pointer">Log In</li>
              </Link>
            </>
          ) : (
            <>
              <span className="mr-2">{session.user?.email}</span>
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {session && (
            <button
              onClick={handleShareReferralLink}
              className="cursor-pointer"
            >
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
