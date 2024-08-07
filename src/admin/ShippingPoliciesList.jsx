import React from 'react';

const ShippingPoliciesList = ({ shippingPolicies }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Shipping Policies</h3>
      {shippingPolicies.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-300">
              <th className="py-3 px-6 text-left text-gray-600">Zone Name</th>
              <th className="py-3 px-6 text-left text-gray-600">Region</th>
              <th className="py-3 px-6 text-left text-gray-600">Shipping Method</th>
            </tr>
          </thead>
          <tbody>
            {shippingPolicies.map((policy, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-6">{policy.zoneName}</td>
                <td className="py-3 px-6">{policy.region}</td>
                <td className="py-3 px-6">{policy.shippingMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4 text-center text-gray-500">
          No shipping zone found for configuration. Please contact the admin to manage your store's shipping.
        </div>
      )}
    </div>
  );
};

export default ShippingPoliciesList;
