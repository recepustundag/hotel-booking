import moment from "moment";

export const alertTime = 2000;

export const hotelList = [];

export const hotels = (items) => {
  items.map((hotel) => {
    hotelList.push({
      value: hotel.id,
      label: hotel.hotel_name,
    });
  });
};

export const convertDate = (date) => {
  return moment.utc(date).format("DD-MM-YYYY");
};

export const removeClass = (selector, className) => {
  const selectors = document.querySelectorAll(selector);
  selectors.forEach((element) => {
    element.classList.remove(className);
  });
};

function cardDateMonth() {
  let months = [];

  for (let index = 1; index <= 12; index++) {
    index < 10 ? months.push(`0${index}`) : months.push(index);
  }
  return months;
}

function cardDateYear() {
  let years = [];

  for (let index = 2013; index <= 2031; index++) {
    years.push(index);
  }

  return years;
}

export const diffDate = (start_date, end_date) => {
  const start = moment(start_date, "DD.MM.YYYY");
  const end = moment(end_date, "DD.MM.YYYY");
  return end.diff(start, 'days') == 0 ? 1 : end.diff(start, 'days');
}

export const formatMoney = (price) => {
  
  const currency_symbol = "₺"

  const formattedOutput = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    });

  return formattedOutput.format(price).replace(currency_symbol, '')
}

export const card_date_months = cardDateMonth();
export const card_date_years = cardDateYear();
