"use client";
import React from "react";
import Tree from "@/components/tree/MainTree";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
type Documents = Array<{}>;

interface TreePageProps {
  documents: Documents;
}

const TreePage: React.FC<TreePageProps> = ({ documents }) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  return (
    <div>
      <ProtectedRoute>
        <Tree />
      </ProtectedRoute>
    </div>
  );
};

export default TreePage;
