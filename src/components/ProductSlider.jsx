import React from 'react';
import Slider from 'react-slick';
import { useGetProductQuery } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductSlider = () => {
  const { data } = useGetProductQuery();

  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show up to 4 products at once
    slidesToScroll: 4, // Scroll one slide at a time
    rows: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          rows: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data?.product.map((product) => (
        <div
          key={product._id} // Add a key prop for better rendering performance
          onClick={() => navigate(`/shop/${product._id}`)}
          className="max-w-full mx-auto p-4   shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        >
          <div className="w-full flex justify-center">
            <img
              className="w-full h-[250px] object-cover"
              src={product.images[0]}
              alt={product.name}
            />
          </div>
          <div className="p-4 bg-white rounded-br rounded-bl">
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#8b7bcf] break-words truncate">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="font-bold text-md sm:text-lg text-[#334155]">
                ${product.price}.00
              </span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProductSlider;
