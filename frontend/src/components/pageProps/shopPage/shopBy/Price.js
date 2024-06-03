import React from "react";
import NavTitle from "./NavTitle";

const Price = () => {
  const priceList = [
    {
      _id: 950,
      priceOne: 5000000,
      priceTwo: 10000000,
    },
    {
      _id: 951,
      priceOne: 10000000,
      priceTwo: 15000000,
    },
    {
      _id: 952,
      priceOne: 15000000,
      priceTwo: 20000000,
    },
    {
      _id: 953,
      priceOne: 20000000,
      priceTwo: 25000000,
    },
    {
      _id: 954,
      priceOne: 25000000,
      priceTwo: 30000000,
    },
    {
      _id: 955,
      priceOne: 30000000,
      priceTwo: 35000000,
    },
  ];

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              {formatNumber(item.priceOne)}đ - {formatNumber(item.priceTwo)}đ
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
