import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg my-8">
      <h1 className="text-3xl font-bold text-center mb-6">Return Policy for Artrader</h1>
      <p className="text-gray-700 mb-4">
        At Artrader, we are committed to ensuring a seamless and enjoyable shopping experience for our valued customers. We understand the importance of clarity regarding our return and refund policies. Please read the following carefully:
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Returns and Refunds:</h2>
      <ul className="list-disc list-inside space-y-4 text-gray-700">
        <li>
          <strong>Responsibility:</strong> Artrader serves as a marketplace connecting buyers with independent merchants. As such, Artrader does not directly sell, store, or ship products and, therefore, is not responsible for returns or refunds. Each merchant on our platform operates independently and has their own returns policy.
        </li>
        <li>
          <strong>Merchant Returns Policy:</strong> Because our merchants have their unique policies, we strongly advise all customers to review the return and refund policies of the individual merchant from whom they have made their purchase. This information is usually available on the merchant’s store page on our website.
        </li>
        <li>
          <strong>No Guarantees by Artrader:</strong> While we facilitate a platform for transactions, Artrader does not guarantee any returns or refunds on behalf of the merchants. The ability to return an item and the conditions under which a return or refund is possible will be solely determined by the merchant’s policy.
        </li>
        <li>
          <strong>Contacting the Merchant:</strong> For any queries related to returns or refunds, please directly contact the merchant from whom you purchased the product. Their contact information can be found on your order confirmation email and on their store page.
        </li>
        <li>
          <strong>Customer Support:</strong> If you encounter any issues in reaching out to the merchant or if you have concerns about a transaction, our customer support team is here to help. Please contact us at <a href="mailto:nzartrader@gmail.com" className="text-blue-600">nzartrader@gmail.com</a>, and we’ll assist you in resolving the issue to the best of our ability.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Dispute Resolution:</h2>
      <p className="text-gray-700 mb-4">
        In cases where a resolution cannot be found directly with the merchant, Artrader may offer mediation services at its discretion. However, the final decision regarding returns or refunds will still lie with the merchant.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Acknowledgment:</h2>
      <p className="text-gray-700 mb-4">
        By making a purchase on Artrader, customers acknowledge and agree that they have read and understood this returns policy and accept that Artrader is not responsible for the return or refund of any products purchased through our platform. Responsibility for returns and refunds lies with the individual merchants from whom the products were purchased.
      </p>
      <p className="text-gray-700 mb-4">
        Thank you for choosing Artrader. We strive to offer a diverse and vibrant marketplace for our community and appreciate your understanding and cooperation with our returns policy.
      </p>
    </div>
  );
};

export default ReturnPolicy;
