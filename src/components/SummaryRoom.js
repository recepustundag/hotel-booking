import React from "react";

const SummaryRoom = ({ selectedRoom, roomType, roomScenic }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center py-2 bg-white rounded">
          <strong>Giriş Tarihi:</strong>
          <span>{selectedRoom.start_date}</span>
        </div>
        <div className="flex flex-col items-center justify-center py-2 bg-white rounded">
          <strong>Çıkış Tarihi:</strong>
          <span>{selectedRoom.end_date}</span>
        </div>
        <div className="flex flex-col items-center justify-center py-2 bg-white rounded">
          <strong>Yetişkin:</strong>
          <span>{selectedRoom.adult}</span>
        </div>
        <div className="flex flex-col items-center justify-center py-2 bg-white rounded">
          <strong>Çocuk:</strong>
          <span>{selectedRoom.child != null ? selectedRoom.child : '-'}</span>
        </div>
        <div className="flex flex-col items-center justify-center py-2 bg-white rounded">
          <strong>Oda Tipi:</strong>
          <span>{roomType?.filter((item) => item.id == selectedRoom.room_type)[0].title}</span>
        </div>
        <div className="flex flex-col items-center justify-center py-2 bg-white rounded">
          <strong>Manzara:</strong>
          <span>{roomScenic?.filter((item) => item.id == selectedRoom.room_scenic)[0].title}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryRoom;
