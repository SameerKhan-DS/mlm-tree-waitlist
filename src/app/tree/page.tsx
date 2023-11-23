import React from "react";
import ProductsPage from "./products";
import Tree from "@/components/tree/MainTree";

type Documents = Array<{}>;

interface TreePageProps {
  documents: Documents;
}

const TreePage: React.FC<TreePageProps> = ({ documents }) => {

  return (
    <div>
      <h1>App Tree</h1>
      <Tree />
      <ProductsPage documents={documents} />
    </div>
  );
};

export default TreePage;
