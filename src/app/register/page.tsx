"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerified, setVerified] = useState(false);

  const handleVerificationChange = () => {
    setVerified(!isVerified);
  };

  const referralCode = searchParams.get("ref");

  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/tree");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    email: "",
    password: "",
    referralCode: referralCode ? referralCode : null,
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setError("Email is invalid");
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      setError("Password is invalid");
      return;
    }
    try {
      if (isVerified) {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.status === 400) {
          setError("This email is already registered");
        }
        if (res.status === 200) {
          setError("");
          router.push("/login");
        }
      } else {
        alert("please select the checkbox");
      }
    } catch (error) {
      setError("Error, try again");
      console.log("error");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />{" "}
            <input
              type="text"
              name="lastName"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />{" "}
            <input
              type="text"
              name="city"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />{" "}
            <input
              type="text"
              name="country"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="email"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="Password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <label>
              <input
                type="checkbox"
                checked={isVerified}
                onChange={handleVerificationChange}
                className="text-white"
              />
              By checking this box, you declare that you have read and accepted
              our General Account Terms of Use.
            </label>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Register
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/login"
          >
            Login with an existing account
          </Link>
        </div>
      </div>
    )
  );
};

export default Register;
