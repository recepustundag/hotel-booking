import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStep } from "../features/hotelBooking/hotelSlice";

/* components */
import StepSelectDate from "./StepSelectDate";
import StepSelectRoom from "./StepSelectRoom";
import Payment from "./Payment";
import StepFooter from "./StepFooter";
import StepNavigation from "./StepNavigation";
import PaymentResult from "./PaymentResult";
import Alert from "./Alert";

/* helper */
import { alertTime } from "../utils";

const Step = () => {
  const dispatch = useDispatch();
  const { step, selectedRoom } = useSelector((state) => state.hotelBooking);
  const [showAlert, setShowAlert] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const stepControl = (param) => {
    let err = false;
    if (param === 2) {
      if (selectedRoom.hotel_id == null || selectedRoom.start_date == null || selectedRoom.end_date == null || selectedRoom.adult == null || selectedRoom.adult == "") {
        err = true;
        setShowMessage("Lütfen gerekli tüm alanları doldurunuz");
      } else {
        dispatch(changeStep(param));
      }
    }
    if (param === 3) {
      if (selectedRoom.room_type == null || selectedRoom.room_scenic == null) {
        err = true;
        setShowMessage("Oda Seçimi ve Manzara Seçimi yapınız");
      } else {
        dispatch(changeStep(param));
      }
    }
    if (param == 4) {
      if (selectedRoom.card_name == null || selectedRoom.card_number == null || selectedRoom.card_date_month == null || selectedRoom.card_date_year == null || selectedRoom.card_cvv == null) {
        err = true;
        setShowMessage("Lütfen kart bilgilerini eksiksiz giriniz");
      } else {
        dispatch(changeStep(param));
      }
    }

    if (err) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, alertTime);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-24">
      {step < 4 && <StepNavigation step={step} />}
      {step === 1 ? <StepSelectDate /> : step === 2 ? <StepSelectRoom /> : step === 3 ? <Payment setShowAlert={setShowAlert} setShowMessage={setShowMessage} /> : <PaymentResult />}

      {step < 4 && <StepFooter stepControl={stepControl} step={step} />}

      {showAlert && <Alert showMessage={showMessage} />}
    </div>
  );
};

export default Step;
