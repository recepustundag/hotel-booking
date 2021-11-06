import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedRoom } from "../features/hotelBooking/hotelSlice";

/* helpers */
import { card_date_months, card_date_years } from "../utils";

/* components */
import CreditCart from "./CreditCart";
import PaymentSidebar from "./PaymentSidebar";

const Payment = ({setShowAlert, setShowMessage}) => {
  const { selectedRoom } = useSelector((state) => state.hotelBooking);
  const dispatch = useDispatch();

  const [cardName, setCardName] = useState(selectedRoom?.card_name);
  const [cardNumber, setCardNumber] = useState(selectedRoom?.card_number);
  const [cardMonth, setCardMonth] = useState(selectedRoom?.card_date_month);
  const [cardYear, setCardYear] = useState(selectedRoom?.card_date_year);
  const [cvv, setCvv] = useState(selectedRoom?.card_cvv);

  if(!selectedRoom.card_date_month){

    setCardMonth("01");
    dispatch(changeSelectedRoom({ ...selectedRoom, card_date_month: "01" }));
  }
  if(!selectedRoom.card_date_year){
    setCardYear("2013");
    dispatch(changeSelectedRoom({ ...selectedRoom, card_date_year: "2013" }));
  }

  const setName = (value) => {
    dispatch(changeSelectedRoom({ ...selectedRoom, card_name: value }));
    setCardName(value);
  };

  const setNumber = (value) => {
    dispatch(changeSelectedRoom({ ...selectedRoom, card_number: value }));
    setCardNumber(value);
  };

  const setMonth = (value) => {
    dispatch(changeSelectedRoom({ ...selectedRoom, card_date_month: value }));
    setCardMonth(value);
  };

  const setYear = (value) => {
    dispatch(changeSelectedRoom({ ...selectedRoom, card_date_year: value }));
    setCardYear(value.substr(2, 4));
  };

  const setCVV = (value) => {
    dispatch(changeSelectedRoom({ ...selectedRoom, card_cvv: value }));
    setCvv(value);
  };

  return (
    <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
      <div className="col-span-2 p-4 border border-gray-200">
        <CreditCart cardName={cardName} cardNumber={cardNumber} cardMonth={cardMonth} cardYear={cardYear} cvv={cvv} />

        <form className="relative p-6 mt-8 space-y-8 text-sm border border-gray-500 md:text-base">
          <div className="absolute top-0 px-4 -mt-4 text-lg font-bold bg-white left-3">Kredi Kartı Bilgileri</div>
          <div>
            <label className="font-semibold">Kart Üzerindeki İsim</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={selectedRoom?.card_name != null ? selectedRoom.card_name : ''} placeholder="Kartın Üzerindeki İsmi Giriniz" className="px-4 py-1" />
          </div>
          <div>
            <label className="font-semibold">Kartın Numarası</label>
            <input type="text" onChange={(e) => setNumber(e.target.value)} value={selectedRoom?.card_number != null ? selectedRoom.card_number : ''} placeholder="Kartın Numarasını Giriniz" className="px-4 py-1" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="w-full">
              <label className="font-semibold">Kart Son Kullanma Tarihi</label>

              <div className="flex items-center justify-between gap-3">
                <select onChange={(e) => setMonth(e.target.value)} className="py-1 rounded-sm" defaultValue={selectedRoom?.card_date_month}>
                  {card_date_months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select onChange={(e) => setYear(e.target.value)} className="py-1 rounded-sm" defaultValue={selectedRoom?.card_date_year}>
                  {card_date_years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="font-semibold">CVV</label>

              <div className="flex items-center justify-between gap-3">
                <input type="number" onChange={(e) => setCVV(e.target.value)} value={selectedRoom?.card_cvv != null ? selectedRoom.card_cvv : ''} placeholder="CVV Giriniz" className="px-2 py-1 rounded-sm" />
              </div>
            </div>
          </div>
        </form>
      </div>

      <PaymentSidebar setShowAlert={setShowAlert} setShowMessage={setShowMessage} />
    </div>
  );
};

export default Payment;
