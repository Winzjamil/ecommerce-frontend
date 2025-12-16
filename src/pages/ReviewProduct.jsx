import React from 'react';
import { useState } from 'react';

import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img1 from '../assets/img1.jpg';
function ReviewProduct() {
  const images = [img1, img2, img3, img4, img5];

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex min-h-screen pt-20  gap-2 pl-10 p-4 bg-green-300 bg-gradient-to-tr from-blue-800  to-stone-600  ">
      <div className="flex flex-col p-4  rounded-sm gap-2">
        {images.map((img, i) => {
          return (
            <div key={i} className=" border border-white p-0.5 rounded-md">
              <div className="p-2 bg-red-300">
                <img
                  src={img}
                  alt="mammmm"
                  className="w-15 h-15 rounded-md cursor-pointer "
                  onClick={() => setMainImage(img)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="  flex flex-wrap items-center ">
        <div className="w-full border border-white rounded-sm bg-stone-400 p-3">
          <img
            src={mainImage}
            alt=""
            className="w-full w-50 h-50 object-cover rounded-xl"
          />

          <div className="flex flex-col items-center  ">
            <p>Car</p>
            <p className="text-">200</p>
            <div className="flex w-full gap-2 justify-between ">
              <button className="p-0.5 rounded-xl bg-gradient-to-tr from-red-600 to-black text-white font-light cursor-pointer w-25">
                Add to cart
              </button>
              <button className="p-0.5 rounded-xl bg-gradient-to-tr from-red-600 to-black text-white font-light cursor-pointer w-17">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewProduct;
