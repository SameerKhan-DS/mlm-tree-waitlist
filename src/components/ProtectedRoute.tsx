'use client'
import { useRouter, redirect } from "next/navigation";
import { useSession } from "next-auth/react"; // replace with your actual session library import

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default ProtectedRoute;
