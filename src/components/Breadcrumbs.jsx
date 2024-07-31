import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const {sessionId,key} = useParams()




  // Do not show breadcrumbs on the home page
  if (location.pathname === "/") {
    return null;
  }

  if(location.pathname === "/about"){
    return null
  }

  if(location.pathname == `/checkout/success/${sessionId}/key/${key}`){
    return null
  }

  if(location.pathname == '/terms-and-condition'){
    return null
  }

  return (
    <nav aria-label="breadcrumb" className="my-4 max-w-[1200px] mx-auto">
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
          return isLast ? (
            <li key={to} className="flex items-center text-gray-700">
              {value}
            </li>
          ) : (
            <li key={to} className="flex items-center">
              <Link to={to} className="text-blue-600 hover:underline">
                {value}
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
