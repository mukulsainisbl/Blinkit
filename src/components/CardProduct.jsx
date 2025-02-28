import  { useState } from "react";
import { DisplayPriceInRuppes } from "../utils/DisplayPrice";
import { Link } from "react-router-dom";
import { validUrlConvert } from "../utils/ValidUlrConvert";
import { priceWithDiscount } from "../utils/PriceWithDiscount";

import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${validUrlConvert(data.name)}-${data._id}`;
  const [loading, setLoading] = useState(false);



  

  return (
    <Link
      to={url}
      className="mb-6  p-4 max-w-40 sm:max-w-48 md:max-w-56 rounded-lg shadow inset-shadow-xs border border-white hover:shadow-md transition bg-white"
    >
      <div className="h-24 md:h-32 w-full overflow-hidden rounded flex justify-center items-center">
        <img
          src={data.image[0]}
          className="h-full w-full object-contain scale-125"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="mt-2 text-xs  text-green-600 bg-green-100 px-2 py-1 rounded-md w-fit">
          10 min
        </div>
        {Boolean(data.discount) && (
          <p className="text-black">
            {data.discount} %{" "}
            <span className="text-red-600 text-sm "> off</span>
          </p>
        )}

        {data.discount === 0 && (
          <p className="text-red-500">
            {data.discount} %{" "}
            <span className="text-red-600 text-sm "> dis</span>
          </p>
        )}
      </div>

      <div className="text-xs md:text-sm font-semibold mt-1 line-clamp-2">
        {data.name}
      </div>

      <div className="text-xs md:text-sm text-gray-600 mt-1">{data.unit}</div>
      <div></div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs md:text-sm font-semibold">
          {DisplayPriceInRuppes(priceWithDiscount(data.price, data.discount))}
        </div>

        {data.stock == 0 ? (
          <p className="text-red-600 ">Out of stock</p>
        ) : (
       <div>
        {/* Button  */}
        <AddToCartButton data={data} />
       </div>
        )}
      </div>
    </Link>
  );
};

export default CardProduct;
