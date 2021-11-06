import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* icons */
import { BsCalendarCheck } from "react-icons/bs";

/* components */
import SummaryRoom from "./SummaryRoom";
import SummaryPrice from "./SummaryPrice";
import ConfirmModal from "./ConfirmModal";

/* store */
import { changeStep, resetRoomDetails, resetSelectedRoom } from "../features/hotelBooking/hotelSlice";

const PaymentResult = () => {

  const dispatch = useDispatch();
  const { selectedRoom, selectedRoomDetail, discountAmount, totalPrice, couponCode } = useSelector((state) => state.hotelBooking);
  const [modalOpen, setModalOpen] = useState(false);
  const [roomType] = useState(selectedRoomDetail.room_type);
  const [roomScenic] = useState(selectedRoomDetail.room_scenic);

  const newReservation = () => {
    dispatch(resetRoomDetails());
    dispatch(resetSelectedRoom());
    dispatch(changeStep(1));
  };

  const updateReservation = () => {
    dispatch(changeStep(1));
  };

  const cancelReservation = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center py-6 border border-gray-200">
        <BsCalendarCheck size={50} className="text-green-700" />
        <div className="my-3 text-lg">Rezervasyon kaydınız alınmıştır.</div>
        <p>
          Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya <br />
          yeni rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.
        </p>
        <div className="flex items-center gap-3 mt-3">
          <button onClick={newReservation} className="px-4 py-1 text-white transition duration-150 bg-blue-900 rounded hover:bg-blue-700">
            Yeni Rezervasyon Yap
          </button>
          <button onClick={updateReservation} className="px-4 py-1 text-white transition duration-150 bg-blue-900 rounded hover:bg-blue-700">
            Rezervasyonu Güncelle
          </button>
          <button onClick={cancelReservation} className="px-4 py-1 text-white transition duration-150 bg-blue-900 rounded hover:bg-blue-700">
            Rezervasyonu İptal Et
          </button>
        </div>
      </div>
      <div className="p-6 mt-6 bg-gray-200 rounded">
        <div className="flex items-center gap-1 mb-4 text-xl font-semibold text-gray-900">
          {selectedRoom.hotel_name} <span className="text-sm">(İstanbul)</span>
        </div>
        <SummaryRoom selectedRoom={selectedRoom} roomType={roomType} roomScenic={roomScenic} />
        <SummaryPrice selectedRoom={selectedRoom} roomType={roomType} roomScenic={roomScenic} totalPrice={totalPrice} discountAmount={discountAmount} couponCode={couponCode} />
      </div>

      {modalOpen && <ConfirmModal setOpenModal={setModalOpen} />}

    </>
  );
};

export default PaymentResult;
