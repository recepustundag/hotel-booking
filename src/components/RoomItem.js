import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedRoom } from "../features/hotelBooking/hotelSlice";

/* helpers */
import { diffDate, formatMoney, removeClass } from "../utils";

const RoomItem = ({ data, type }) => {
  const dispatch = useDispatch();
  const { selectedRoom } = useSelector((state) => state.hotelBooking);
  const adult = selectedRoom.adult;
  const child = selectedRoom.child;
  const date = diffDate(selectedRoom.start_date, selectedRoom.end_date);
  
  const handleSelectRoom = (e, type) => {
    removeClass(`.room-item__${type}`, "active");
    e.target.closest(`.room-item__${type}`).classList.add("active");
    dispatch(changeSelectedRoom({ ...selectedRoom, [type]: data.id }));
  };
  
  return (
    <div
      onClick={(e) => handleSelectRoom(e, type)}
      className={`p-6 transition duration-150 rounded cursor-pointer room-item hover:border-green-400 room-item__${type} ${data.id === selectedRoom[type] && "active"} `}
    >
      <div className="font-semibold">{data.title}</div>
      <img alt="" src={data.photo} />
      <div className="flex items-start justify-between mt-1">
        <div className="flex flex-col">
          <span>{date} Gün</span>
          {adult != null && (<span>{adult} Yetişkin</span>)}
          {child != null && (<span>{child} Çocuk</span>)}
        </div>
        {data.price ? <div className="text-xl font-semibold">{formatMoney(data.price * date)} TL</div> : <div className="text-xl font-semibold">{data.price_rate}%</div>}
      </div>
    </div>
  );
};

export default RoomItem;
