import React, { useEffect, useState } from 'react';
import { useGetSingleProductQuery } from '../redux/productSlice';
import WishList from './WishList';

const WishListProduct = () => {
    const [wishListProduct, setWishListProduct] = useState([]);

    useEffect(() => {
        const lsData = localStorage.getItem('wishList');
        setWishListProduct(JSON.parse(lsData) || []);
    }, []);

    console.log(wishListProduct);

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6">WishList Product Listing</h2>
            <div className="overflow-x-auto">
                {wishListProduct.length > 0 ? (
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">
                                    S.no
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">
                                    Name
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">
                                    Image
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">
                                    Price
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">
                                    Description
                                </th>
                                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm uppercase font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishListProduct.map((product, i) => (
                                <WishList productId={product.pId} index={i} key={i} />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500 mt-4">No products in your wishlist</p>
                )}
            </div>
        </div>
    );
};

export default WishListProduct;
