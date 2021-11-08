import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStep, setCreatedHotelID } from "../features/hotelBooking/hotelSlice";

/* components */
import StepSelectDate from "./StepSelectDate";
import StepSelectRoom from "./StepSelectRoom";
import Payment from "./Payment";
import StepFooter from "./StepFooter";
import StepNavigation from "./StepNavigation";
import PaymentResult from "./PaymentResult";
import Alert from "./Alert";

/* helper */
import { alertTime, baseURL, postData } from "../utils";

const Step = () => {
  const dispatch = useDispatch();
  const { step, selectedRoom, totalPrice, couponCode, selectedRoomDetail, updateMode, createdHotelID } = useSelector((state) => state.hotelBooking);
  const [showAlert, setShowAlert] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  
  const sendResort = (param) => {
    let url,method;
    const data = {
      hotel_id: parseInt(selectedRoom.hotel_id),
      start_date: selectedRoom.start_date,
      end_date: selectedRoom.end_date,
      adult: parseInt(selectedRoom.adult),
      child: selectedRoom.child == null ? 0 : parseInt(selectedRoom.child),
      room_type: selectedRoomDetail.room_type?.filter((item) => item.id == selectedRoom.room_type)[0]?.title,
      room_scenic: selectedRoomDetail.room_scenic?.filter((item) => item.id == selectedRoom.room_scenic)[0]?.title,
      price: totalPrice,
      card_name: selectedRoom.card_name,
      card_number: selectedRoom.card_number,
      card_date_month: selectedRoom.card_date_month,
      card_date_year: selectedRoom.card_date_year,
      card_cvv: selectedRoom.card_cvv,
    };
    if (couponCode != null) {
      data["coupon_code"] = couponCode;
    }
    
    if(updateMode){
      url = `${baseURL}/${createdHotelID}`;
      method = 'UPDATE';
    }else{
      url = baseURL;
      method = 'POST';
    }
    
    postData(url, data, method)
      .then((data) => {
        if (data) {
          dispatch(setCreatedHotelID(data.id));
          setShowMessage("Rezervasyonunuz başarılı bir şekilde kayıt edildi");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            dispatch(changeStep(param));
          }, alertTime);
        }
      })
      .catch((err) => {
        setShowMessage("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyiniz");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, alertTime);
      });
  };

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
        sendResort(param);
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
