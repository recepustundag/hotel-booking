import React from "react";

/* helpers */
import { diffDate, formatMoney } from "../utils";

const SummaryPrice = ({selectedRoom, roomType, roomScenic, couponCode, totalPrice, discountAmount}) => {
  const roomDay = diffDate(selectedRoom?.start_date, selectedRoom?.end_date);

  return (
    <>
      <div className="flex flex-col items-center gap-2 px-4 py-6 mt-4 space-y-3 bg-white rounded">
        <div className="flex items-center justify-between w-full">
          <span className="font-semibold">Oda Fiyatı</span>
          <span>{formatMoney(roomType?.filter((item) => item.id == selectedRoom.room_type)[0].price)} TL</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="font-semibold">Fiyat Etki Oranı</span>
          <span>%{roomScenic?.filter((item) => item.id == selectedRoom.room_scenic)[0].price_rate}</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="font-semibold">
            Konaklama <span className="font-normal">({roomDay} gün)</span>
          </span>
          <span>{formatMoney(roomType?.filter((item) => item.id == selectedRoom.room_type)[0].price * roomDay)} TL</span>
        </div>
        {couponCode && (
          <div className="flex items-center justify-between w-full">
            <span className="font-semibold">
              indirim <span className="font-normal">({couponCode})</span>
            </span>
            <span> - {discountAmount} TL </span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-full py-8 text-2xl font-semibold bg-white border-t border-gray-300">
        <div>Toplam Tutar</div>
        <div>{ couponCode ? formatMoney(totalPrice - discountAmount) : formatMoney(totalPrice)} TL</div>
      </div>
    </>
  );
};

export default SummaryPrice;
