import React from "react";
import { useDispatch } from "react-redux";
import { changeStep, resetRoomDetails, resetSelectedRoom } from "../features/hotelBooking/hotelSlice";

const ConfirmModal = ({setOpenModal}) => {
  
  const dispatch = useDispatch();

  const closeModal = () => {
    setOpenModal(false);
  }

  const confirmReservation = () => {
    dispatch(resetRoomDetails());
    dispatch(resetSelectedRoom());
    dispatch(changeStep(1));
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg md:max-w-md">
        <div className="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer">
          <svg className="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
          <span className="text-sm">(Esc)</span>
        </div>

        <div className="px-6 py-4 text-left">
          <div className="flex items-center justify-between pb-3">
            <p className="text-2xl font-bold">İşlemi Onayla!</p>
            <div onClick={closeModal} className="z-50 cursor-pointer">
              <svg className="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          <p>Rezervasyon kaydınızı iptal etmek istediğinize emin misiniz?</p>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={confirmReservation} className="px-4 py-1 text-white transition duration-150 bg-red-700 rounded hover:bg-red-900">Onayla</button>
            <button onClick={closeModal} className="px-4 py-1 text-gray-900 transition duration-150 bg-gray-200 rounded hover:bg-gray-300">Vazgeç</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
