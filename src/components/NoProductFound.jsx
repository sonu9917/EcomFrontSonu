import React from 'react';
import { noProduct } from '../assets';

const NoProductFound = () => {
  return (
    <div className="p-4 bg-white flex flex-col items-center h-[70vh] pt-[100px] ">
      <div className="flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120.293" height="120.293" viewBox="0 0 120.293 120.293">
          <defs>
            <linearGradient id="linear-gradient" x1="0.5" y1="1.295" x2="0.5" gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#00e3ae" />
              <stop offset="1" stop-color="#9be15d" />
            </linearGradient>
            <linearGradient id="linear-gradient-2" x1="0.5" y1="0.24" x2="1" y2="1.755" gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#fad961" />
              <stop offset="1" stop-color="#f76b1c" />
            </linearGradient>
            <filter id="Oval" x="34.295" y="18.977" width="51.704" height="51.704" filterUnits="userSpaceOnUse">
              <feOffset dy="4" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood flood-opacity="0.118" />
              <feComposite operator="in" in2="blur" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g id="No_Product_Found" data-name="No Product Found" transform="translate(-0.854)">
            <circle id="Oval-2" data-name="Oval" cx="60.146" cy="60.146" r="60.146" transform="translate(0.854 0)" fill="#1abc9c" opacity="0.1" />
            <path id="Shape" d="M28.864,40.39a7.346,7.346,0,0,1-1.509-.157L6.767,35.9a.812.812,0,0,1-.647-.777L5.764,21.4a.818.818,0,0,1,.744-.833L24,19.026a.811.811,0,0,0,.682-.5l2.634-6.4a.787.787,0,0,1,.745-.506.8.8,0,0,1,.825.817V36.319l19.012-3.608V21.074a.816.816,0,0,1,.815-.815.833.833,0,0,1,.094.005l2.339.362a.815.815,0,0,1,.722.81V34.954a.818.818,0,0,1-.644.8L30.407,40.226A7.36,7.36,0,0,1,28.864,40.39ZM57.138,17.541l-.068,0L36.5,15.883a.817.817,0,0,1-.677-.474L28.8,0l23.11,4.16a.816.816,0,0,1,.6.464l5.365,11.763a.815.815,0,0,1-.739,1.154ZM.812,17.509a.815.815,0,0,1-.734-1.161L5.566,4.616a.817.817,0,0,1,.591-.456L28.8,0,22.172,14.942a.818.818,0,0,1-.663.481L.9,17.505A.852.852,0,0,1,.812,17.509Z" transform="translate(32.463 49.171)" fill="url(#linear-gradient)" />
            <g id="flaticon1547445770-svg" transform="translate(47.39 27.22)">
              <g transform="matrix(1, 0, 0, 1, -46.54, -27.22)" filter="url(#Oval)">
                <g id="Oval-3" data-name="Oval" transform="translate(46.54 27.22)" stroke="#fff" stroke-miterlimit="10" stroke-width="3.242" fill="url(#linear-gradient-2)">
                  <circle cx="13.61" cy="13.61" r="13.61" stroke="none" />
                  <circle cx="13.61" cy="13.61" r="15.231" fill="none" />
                </g>
              </g>
              <g id="Group" transform="translate(7.024 7.902)">
                <path id="Path" d="M12.054,4.157a.873.873,0,0,1-.622-.262A7.083,7.083,0,0,0,1.5,3.9a.866.866,0,0,1-1.242,0,.911.911,0,0,1,0-1.268,8.649,8.649,0,0,1,12.417,0,.911.911,0,0,1,0,1.268A.858.858,0,0,1,12.054,4.157Z" transform="translate(1 8)" fill="#fff" />
                <ellipse id="Oval-4" data-name="Oval" cx="1.756" cy="1.793" rx="1.756" ry="1.793" transform="translate(0 0)" fill="#fff" />
                <ellipse id="Oval-5" data-name="Oval" cx="1.756" cy="1.793" rx="1.756" ry="1.793" transform="translate(10.537 0)" fill="#fff" />
              </g>
            </g>
          </g>
        </svg>

      </div>
      <h2 className="text-2xl font-bold mt-4">No Products Found!</h2>
      <p className="text-gray-600 mt-2">
        Ready to start selling something awesome?
      </p>
    </div>
  );
};

export default NoProductFound;
