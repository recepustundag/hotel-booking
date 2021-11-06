import React from "react";

/* icons */
import { RiCalendar2Line } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";

const StepNavigation = ({step}) => {
  return (
    <div className="relative grid grid-cols-3 gap-2 py-4 text-xs font-semibold text-center bg-gray-200 border border-gray-300 rounded md:text-base step-navigation">
      <div className="relative flex flex-col items-center justify-center step-navigation__progress active">
        <span className="z-20 flex items-center justify-center p-6 mb-3 bg-white border border-gray-300 rounded-full cursor-pointer">
          <RiCalendar2Line size={28} />
        </span>
        <span className="h-12">
          Otel ve Tarih <br /> Seçimi
        </span>
      </div>
      <div className={`relative flex flex-col items-center justify-center step-navigation__progress ${step > 1 && 'active'}`}>
        <span className="relative z-20 flex items-center justify-center p-6 mb-3 bg-white border border-gray-300 rounded-full cursor-pointer">
          <FaBed size={28} />
        </span>
        <span className="h-12">
          Oda Tipi ve Manzara <br /> Seçimi
        </span>
      </div>
      <div className={`relative flex flex-col items-center justify-center step-navigation__progress ${step > 2 && 'active'}`}>
        <span className="relative z-20 flex items-center justify-center p-6 mb-3 bg-white border border-gray-300 rounded-full cursor-pointer">
          <BsCreditCard size={28} />
        </span>
        <span className="h-12">
          Önizleme ve Ödeme <br /> İşlemleri
        </span>
      </div>
    </div>
  );
};

export default StepNavigation;
