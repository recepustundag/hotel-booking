import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoomDetail } from "../features/hotelBooking/hotelSlice";

/* components */
import Rooms from "./Rooms";

const StepSelectRoom = () => {
  const dispatch = useDispatch();
  const { roomDetails, selectedRoom, selectedRoomDetail } = useSelector((state) => state.hotelBooking);
  const [roomDetail, setRoomDetail] = useState(false);

  if (roomDetails) {
    if (!roomDetail && !selectedRoomDetail && selectedRoomDetail == null) {
      setRoomDetail(roomDetails.filter((item) => item.hotel_id == selectedRoom.hotel_id)[0]);
      setTimeout(() => {
        dispatch(setSelectedRoomDetail(roomDetails.filter((item) => item.hotel_id == selectedRoom.hotel_id)[0]));
      }, 500);
    }
  }

  return (
    <div>
      <div className="p-4 mt-6 bg-gray-200 border border-gray-300 rounded">
        <div className="flex items-center gap-1 mb-2 text-xl font-semibold text-gray-900">
          {selectedRoom.hotel_name} <span className="text-sm">({selectedRoomDetail?.city})</span>
        </div>
        <div className="flex flex-col items-start gap-2 md:flex-row">
          <div>
            <strong>Giriş Tarihi:</strong> {selectedRoom.start_date} -
          </div>
          <div>
            <strong>Çıkış Tarihi:</strong> {selectedRoom.end_date} -
          </div>
          <div>
            <strong>Yetişkin:</strong> {selectedRoom.adult} 
          </div>
          {selectedRoom.child != null && (
            <div> - 
              <strong> Çocuk:</strong> {selectedRoom.child}
            </div>
          )}
        </div>
      </div>
      <Rooms title="Oda Seçimi" type="room_type" data={selectedRoomDetail?.room_type} />
      <Rooms title="Manzara Seçimi" type="room_scenic" data={selectedRoomDetail?.room_scenic} />
    </div>
  );
};

export default StepSelectRoom;
