import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

/* store */
import { fetchCouponCodes, setCouponCode, setDiscountAmount, setTotalPrice } from "../features/hotelBooking/hotelSlice";

/* components */
import SummaryPrice from "./SummaryPrice";
import SummaryRoom from "./SummaryRoom";

/* helper */
import { alertTime, diffDate } from "../utils";

const PaymentSidebar = ({setShowAlert, setShowMessage}) => {
  const dispatch = useDispatch();
  const { selectedRoom, couponCodes , discountAmount, totalPrice, couponCode, selectedRoomDetail } = useSelector((state) => state.hotelBooking);
  const [coupon, setCoupon] = useState(null);

  const roomType = selectedRoomDetail.room_type;
  const roomScenic = selectedRoomDetail.room_scenic;
  const roomDay = diffDate(selectedRoom?.start_date, selectedRoom?.end_date);
  const stopever = roomType?.filter((item) => item.id == selectedRoom.room_type)[0].price * roomDay;

  dispatch(setTotalPrice(stopever));

  const sendCouponCode = () => {
    if (coupon) {
      const code = couponCodes.filter((item) => item.code === coupon);
      if (code.length !== 0) {
        if(diffDate(new Date().toLocaleDateString(), moment(code[0].expiration_at).format("DD.MM.YYYY")) > 0){
          dispatch(setCouponCode(code[0].code));
          dispatch(setDiscountAmount(code[0].discount_ammount));
          dispatch(setTotalPrice(totalPrice - code[0].discount_ammount));
        }else{
          setShowAlert(true);
          setShowMessage('Bu kupon kodu artık kullanılmıyor');
          setTimeout(() => {
            setShowAlert(false);
          }, alertTime);
        }
      } else {
        dispatch(setCouponCode(null));
        dispatch(setTotalPrice(totalPrice));
        setShowAlert(true);
        setShowMessage('Geçersiz kupon kodu');
        setTimeout(() => {
          setShowAlert(false);
        }, alertTime);
      }
    } else {
      setShowAlert(true);
      setShowMessage('Lütfen bir kupon kodu giriniz');
      setTimeout(() => {
        setShowAlert(false);
      }, alertTime);
    }
  };
  
  useEffect(() => {
    if (!couponCodes) dispatch(fetchCouponCodes());
  }, [useSelector]);


  return (
    <div className="col-span-1 p-4 bg-gray-200 rounded">
      <div className="flex items-center gap-1 mb-4 text-xl font-semibold text-gray-900">
        {selectedRoom.hotel_name} <span className="text-sm">({selectedRoomDetail?.city})</span>
      </div>

      <SummaryRoom selectedRoom={selectedRoom} roomType={roomType} roomScenic={roomScenic} />

      <div className="flex items-center gap-2 p-4 mt-4 bg-white rounded">
        <input type="text" onChange={(e) => setCoupon(e.target.value)} placeholder="Kupon Kodu" className="px-2 py-1" />
        <button onClick={sendCouponCode} className="px-2 py-1.5 leading-4 text-sm text-white transition duration-150 bg-blue-900 rounded whitespace-nowrap hover:bg-blue-800">
          Kodu Kullan
        </button>
      </div>

      <SummaryPrice selectedRoom={selectedRoom} roomType={roomType} roomScenic={roomScenic} totalPrice={totalPrice} discountAmount={discountAmount} couponCode={couponCode} />
    </div>
  );
};

export default PaymentSidebar;
