import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetSingleProductQuery, useGetSingleCategoryQuery, useGetSingleSubCategoryQuery } from '../redux/productSlice';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { sessionId, key, id, categoryId, subcategoryId } = useParams(); // Get IDs from URL

  // State for product, category, and subcategory names
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');

  // Fetch product data only if id is defined
  const { data: productData } = useGetSingleProductQuery(id, {
    skip: !id, // Skip the query if id is undefined
  });

  // Fetch category data only if categoryId is defined
  const { data: categoryData } = useGetSingleCategoryQuery(categoryId, {
    skip: !categoryId, // Skip the query if categoryId is undefined
  });

  // Fetch subcategory data only if subcategoryId is defined
  const { data: subcategoryData } = useGetSingleSubCategoryQuery(subcategoryId, {
    skip: !subcategoryId, // Skip the query if subcategoryId is undefined
  });

  useEffect(() => {
    if (productData) {
      setProductName(productData.product.name);
    }
    if (categoryData) {
      setCategoryName(categoryData.category.name);
    }
    if (subcategoryData) {
      setSubcategoryName(subcategoryData.subCategory.subCategory);
    }
  }, [productData, categoryData, subcategoryData]);

  // Do not show breadcrumbs on specific pages
  const excludedPaths = [
    '/',
    '/about',
    `/checkout/success/${sessionId}/key/${key}`,
    '/terms-and-condition',
    '/register',
    '/login'
  ];

  if (excludedPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="my-10 max-w-[1100px] mx-auto">
      <ol className="flex text-sm text-gray-500">
        <li className="flex items-center">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <svg
            className="w-4 h-4 mx-2 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          // Determine the display name based on the current path value
          let displayName;
          if (value === id) {
            displayName = productName;
          } else if (value === categoryId) {
            displayName = categoryName;
          } else if (value === subcategoryId) {
            displayName = subcategoryName;
          } else {
            displayName = value;
          }

          return isLast ? (
            <li key={to} className="flex items-center  text-gray-700">
              {displayName}
            </li>
          ) : (
            <li key={to} className="flex items-center">
              <Link to={to} className="text-blue-600 hover:underline" style={{
                textTransform:'capitalize'
              }}>
                {displayName}
              </Link>
              <svg
                className="w-4 h-4 mx-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
