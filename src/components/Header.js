import React from 'react'
import { useDispatch } from 'react-redux';
import { changeStep, resetRoomDetails, resetSelectedRoom } from '../features/hotelBooking/hotelSlice';

const Header = () => {
  const dispatch = useDispatch();

  const newReservation = () => {
    dispatch(resetRoomDetails());
    dispatch(resetSelectedRoom());
    dispatch(changeStep(1))
  }

  return (
    <div className="flex items-start justify-between px-4 py-2 bg-blue-900 md:items-center">
      <div className="flex flex-col text-white">
        <div className="text-3xl font-semibold">Otel</div>
        <span>Rezervasyon Sistemi</span>
      </div>
      <div>
        <button onClick={newReservation} className="px-1 py-1 text-sm text-blue-900 transition duration-150 bg-blue-200 rounded md:px-2 md:text-base hover:bg-blue-300">Yeni Rezervasyon Yap</button>
      </div>
    </div>
  )
}

export default Header
