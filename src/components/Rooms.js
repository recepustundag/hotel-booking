import React from "react";

/* compoents */
import RoomItem from "./RoomItem";

const Rooms = ({ title, data, type }) => {
  return (
    <div className="mt-6">
      {data && (
        
        <>
          <div className="pb-2 mb-6 text-xl font-bold border-b border-gray-200">{title}</div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {
              data.map(item => {
                return <RoomItem type={type} key={item.id} data={item} />
              })
            }
          </div>
        </>
      )}
    </div>
  );
};

export default Rooms;
