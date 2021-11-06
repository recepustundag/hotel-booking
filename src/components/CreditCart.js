import React from "react";

const CreditCart = ({cardName,cardNumber,cardMonth,cardYear,cvv}) => {
  
  return (
    <div className="relative w-full h-56 max-w-md text-gray-900 bg-gray-200 rounded-xl">

      <div className="absolute w-full px-8 top-8">
        <div className="flex justify-between">
          <div className="">
            <p className="font-light">İsim Soyisim</p>
            <p className="font-medium tracking-widest">{cardName ?? '..... ........'}</p>
          </div>
          <img className="w-14 h-14" alt="" src="https://i.imgur.com/bbPHJVe.png" />
        </div>
        <div className="pt-1">
          <p className="font-light">Kart Numarası</p>
          <p className="font-medium tracking-more-wider">{cardNumber ?? '.... .... .... ....'}</p>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex justify-between">
            <div className="">
              <p className="text-xs font-light">Gün/Yıl</p>
              <p className="text-sm font-medium tracking-wider">{cardMonth ?? '..'} / {cardYear ?? '..'}</p>
            </div>
            <div className="">
              <p className="text-xs font-light">CVV</p>
              <p className="text-sm font-bold tracking-more-wider">{cvv ?? '...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCart;
