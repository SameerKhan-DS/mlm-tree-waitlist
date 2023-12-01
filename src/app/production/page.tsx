import ProtectedRoute from "@/components/ProtectedRoute";
import ProductionTab from "../../components/ProductionTab/ProductionTab";
import React from "react";

const productionPage = () => {
  return (
    <ProtectedRoute>
      <ProductionTab />
    </ProtectedRoute>
  );
};

export default productionPage;
