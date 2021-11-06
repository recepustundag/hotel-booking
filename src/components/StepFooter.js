import React from "react";
import { changeStep } from "../features/hotelBooking/hotelSlice";

/* icons */
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";

const StepFooter = ({ step, stepControl }) => { 
  const dispatch = useDispatch();
  
  return (
    <div className={`flex items-center p-4 mt-6 bg-gray-200 border border-gray-300 rounded ${step === 1 ? 'justify-end' : 'justify-between'}`}>
      {step !== 1 && (
        <button onClick={(e) => dispatch(changeStep(step - 1))} className="flex items-center gap-1 px-2 py-1 text-sm text-white transition duration-150 bg-blue-900 rounded md:px-6 md:text-base hover:bg-blue-800">
          <AiOutlineDoubleLeft size={12} className="mt-0.5" />
          Geri
        </button>
      )}
      {
        step > 0 && step < 3 && <button onClick={() => stepControl(step + 1)} className="px-2 py-1 text-sm text-white transition duration-150 bg-blue-900 rounded md:px-6 md:text-base hover:bg-blue-800">Kaydet ve Devam Et</button>
      }
      {
        step === 3 && <button onClick={() => stepControl(step + 1)} className="px-2 py-1 text-sm text-white transition duration-150 bg-blue-900 rounded md:px-6 md:text-base hover:bg-blue-800">Ödeme Yap ve Bitir</button>
      }
    </div>
  );
};

export default StepFooter;
