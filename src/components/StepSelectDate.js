import { useEffect, useState } from "react";
import { fetchRooms, changeSelectedRoom, fetchRoomsDetails } from "../features/hotelBooking/hotelSlice";

/* components */
import Select from "react-select";
import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tr from "date-fns/locale/tr";

/* icons */
import { RiCalendar2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

/* helper */
import { convertDate, hotelList, hotels } from "../utils";

registerLocale("tr", tr);

const StepSelectDate = () => {
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [childStatus, setChildStatus] = useState(true);
  const [maxAdultSize, setMaxAdultSize] = useState(5);
  const dispatch = useDispatch();
  const { rooms, selectedRoom, roomDetails } = useSelector((state) => state.hotelBooking);

  const handleSelectChange = (data) => {
    dispatch(changeSelectedRoom({ ...selectedRoom, hotel_id: data.value, hotel_name: data.label }));
    setChildStatus(roomDetails.filter((item) => item.hotel_id == data.value)[0]?.child_status);
    setMaxAdultSize(roomDetails.filter((item) => item.hotel_id == data.value)[0]?.max_adult_size);
  };
  
  const handleStartDateChange = (date) => {
    setStartDate(date);
    dispatch(changeSelectedRoom({ ...selectedRoom, start_date: convertDate(date) }));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    dispatch(changeSelectedRoom({ ...selectedRoom, end_date: convertDate(date) }));
  };

  if (rooms != null) {
    hotels(rooms);
  }

  if(selectedRoom.start_date == null){
    dispatch(changeSelectedRoom({ ...selectedRoom, start_date: convertDate(startDate) }));
  }

  if(selectedRoom.end_date == null){
    dispatch(changeSelectedRoom({ ...selectedRoom, end_date: convertDate(endDate) }));
  }

  const handleAdultChange = (value, e) => {
    dispatch(changeSelectedRoom({ ...selectedRoom, adult: value }));
  };

  const handleChildChange = (value, e) => {
    if (value > 5) {
      alert("Çocuk sayısı max 5 olmalıdır");
      e.target.value = "";
      return false;
    }
    dispatch(changeSelectedRoom({ ...selectedRoom, child: value }));
  };

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchRoomsDetails());
  }, [dispatch]);
  return (
    <div className="px-4 py-4 mt-8 border border-gray-300 rounded">
      <Select
        options={hotelList}
        onChange={handleSelectChange}
        defaultValue={{ value: selectedRoom.hotel_id ?? '', label: selectedRoom.hotel_name ?? '' }}
        className="cursor-pointer"
        placeholder="Rezervasyon yapmak istediğiniz oteli seçiniz."
      />
      <div className="grid grid-cols-2 mt-6 md:grid-cols-4">
        <div className="flex flex-col items-start p-4 border">
          <div className="mb-2 font-semibold text-gray-600">Giriş Tarihi</div>
          <div className="flex items-center justify-center w-full">
            <ReactDatePicker
              minDate={new Date()}
              closeOnScroll={true}
              className="px-2 py-1"
              dateFormat="dd/MM/yyyy"
              todayButton="Bugün"
              selected={startDate}
              locale="tr"
              onChange={(date) => handleStartDateChange(date)}
            />
            <RiCalendar2Line size={26} className="ml-2" />
          </div>
        </div>
        <div className="flex flex-col items-start p-4 border">
          <div className="mb-2 font-semibold text-gray-600">Çıkış Tarihi</div>
          <div className="flex items-center justify-center w-full">
            <ReactDatePicker
              minDate={startDate}
              closeOnScroll={true}
              className="px-2 py-1"
              dateFormat="dd/MM/yyyy"
              todayButton="Bugün"
              selected={endDate}
              locale="tr"
              onChange={(date) => handleEndDateChange(date)}
            />
            <RiCalendar2Line size={26} className="ml-2" />
          </div>
        </div>
        <div className="flex flex-col items-start p-4 border">
          <div className="mb-2 font-semibold text-gray-600">Yetişkin Sayısı</div>
          <select onChange={(e) => handleAdultChange(e.target.value, e)} defaultValue={selectedRoom?.adult != null && selectedRoom.adult} className="px-2 py-1">
            <option value="">Seçiniz</option>
            {[...Array(maxAdultSize)].map((x, i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start p-4 border">
          <div className="mb-2 font-semibold text-gray-600">Çocuk Sayısı</div>
          <input
            type="number"
            disabled={!childStatus}
            onChange={(e) => handleChildChange(e.target.value, e)}
            value={selectedRoom?.child != null && selectedRoom.child}
            className="px-2 py-1 text-right"
            min="0"
            maxLength="5"
          />
        </div>
      </div>
    </div>
  );
};

export default StepSelectDate;
