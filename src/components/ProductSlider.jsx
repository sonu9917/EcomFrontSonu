import React from 'react';
import Slider from 'react-slick';
import { useGetProductQuery } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductSlider = () => {
  const { data } = useGetProductQuery();

  const navigate = useNavigate()

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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>

      {
        data?.product.map((product) => (
          <div onClick={() => navigate(`/shop/${product._id}`)}  className="max-w-md mx-auto p-4 rounded-lg overflow-hidden shadow-md hover:shadow-lg">
            <div className="">
              <img
                className="w-full h-[250px]"
                src={product.images[0]}
                alt="Product Image"
              />
             
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold mb-2 text-[#8b7bcf]">{product.name}</h3>
              {/* <p className="text-gray-600 text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ante
                vel eros fermentum faucibus sit amet euismod lorem.
              </p> */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-[#334155]">${product.price}</span>
              </div>
            </div>
          </div>
        ))
      }
    </Slider>
  );
};

export default ProductSlider;
