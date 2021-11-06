import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: parseInt(localStorage.getItem('activeStep')) || 1,
  status: false,
  rooms: null,
  roomDetails: null,
  couponCodes: null,
  discountAmount: null,
  totalPrice: null,
  couponCode: null,
  selectedRoom: JSON.parse(localStorage.getItem('selectedRoom')) || {
    hotel_id: null,
    hotel_name: null,
    start_date: null,
    end_date: null,
    adult: null,
    child: null,
    room_type: null,
    room_scenic: null,
    price: null,
    coupon_code: null,
    card_name: null,
    card_number: null,
    card_date_month: null,
    card_date_year: null,
    card_cvv: null,
  },
  selectedRoomDetail: JSON.parse(localStorage.getItem('selectedRoomDeteils')) || null,
};

export const hotelSlice = createSlice({
  name: "hotelBooking",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    changeStep: (state, action) => {
      state.step = action.payload;
      localStorage.setItem('activeStep', action.payload);
    },
    getRooms: (state, action) => {
      state.rooms = action.payload;
    },
    getRoomDetails: (state, action) => {
      state.roomDetails = action.payload;
    },
    resetRoomDetails: (state) => {
      state.roomDetails = null
    },
    changeSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
      localStorage.setItem('selectedRoom', JSON.stringify(state.selectedRoom));
    },
    resetSelectedRoom: (state) => {
      state.selectedRoom = { hotel_id: null, start_date: null, end_date: null, adult: null, child: null, room_type: null, room_scenic: null, price: null, coupon_code: null, card_name: null, card_number: null, card_date_month: null, card_date_year: null, card_cvv: null, }
      localStorage.removeItem('selectedRoom');
    },
    addCouponCodes: (state, action) => {
      state.couponCodes = action.payload;
    },
    setDiscountAmount: (state, action) => {
      state.discountAmount = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    setSelectedRoomDetail: (state, action) => {
      state.selectedRoomDetail = action.payload;
      localStorage.setItem('selectedRoomDeteils', JSON.stringify(action.payload));
    }
  },
});

export const { changeStep, getRooms, getRoomDetails, changeStatus, changeSelectedRoom, addCouponCodes, resetRoomDetails,resetSelectedRoom, setDiscountAmount, setTotalPrice, setCouponCode, setSelectedRoomDetail } = hotelSlice.actions;

export default hotelSlice.reducer;

export function fetchRooms() {
  return async (dispatch) => {
    dispatch(changeStatus(true));

    try {
      const response = await fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels");
      const data = await response.json();
      
      dispatch(getRooms(data));
      dispatch(changeStatus(false));
    } catch (error) {
      dispatch(changeStatus(false));
    }
  };
}
export function fetchRoomsDetails() {
  return async (dispatch) => {
    dispatch(changeStatus(true));

    try {
      const response = await fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details");
      const data = await response.json();

      dispatch(getRoomDetails(data));
      dispatch(changeStatus(false));
    } catch (error) {
      dispatch(changeStatus(false));
    }
  };
}
export function fetchCouponCodes() {
  return async (dispatch) => {
    dispatch(changeStatus(true));

    try {
      const response = await fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons");
      const data = await response.json();
      
      dispatch(addCouponCodes(data));
      dispatch(changeStatus(false));
    } catch (error) {
      dispatch(changeStatus(false));
    }
  };
}
