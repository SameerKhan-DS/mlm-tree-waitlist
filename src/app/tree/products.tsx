import React from 'react';

interface ProductsPageProps {
  documents: Array<{}>;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ documents }) => {

  return (
    <div>
      <h2>Check</h2>
      {/* Iterate over documents and display information as needed */}
      
    </div>
  );
};

export default ProductsPage;
