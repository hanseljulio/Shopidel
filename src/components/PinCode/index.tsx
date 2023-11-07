import { useState } from "react";
import Button from "../Button";

interface IPinCode {
  onSubmit: (data: string) => void;
}

const PinCode = ({ onSubmit }: IPinCode) => {
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex gap-x-2">
        <input
          type="text"
          name="input1"
          id="input1"
          className="w-10 rounded-md"
          value={pin.pin1}
          maxLength={1}
          onChange={(e) => {
            if (!/[0-9]/g.test(e.target.value) && e.target.value !== "")
              return e.preventDefault();
            setPin({ ...pin, pin1: e.target.value });
          }}
        />
        <input
          type="text"
          name="input2"
          id="input2"
          className="w-10 rounded-md"
          value={pin.pin2}
          maxLength={1}
          onChange={(e) => {
            if (!/[0-9]/g.test(e.target.value) && e.target.value !== "")
              return e.preventDefault();
            setPin({ ...pin, pin2: e.target.value });
          }}
        />
        <input
          type="text"
          name="input3"
          id="input3"
          className="w-10 rounded-md"
          value={pin.pin3}
          maxLength={1}
          onChange={(e) => {
            if (!/[0-9]/g.test(e.target.value) && e.target.value !== "")
              return e.preventDefault();
            setPin({ ...pin, pin3: e.target.value });
          }}
        />
        <input
          type="text"
          name="input4"
          id="input4"
          className="w-10 rounded-md"
          value={pin.pin4}
          maxLength={1}
          onChange={(e) => {
            if (!/[0-9]/g.test(e.target.value) && e.target.value !== "")
              return e.preventDefault();
            setPin({ ...pin, pin4: e.target.value });
          }}
        />
        <input
          type="text"
          name="input4"
          id="input4"
          className="w-10 rounded-md"
          value={pin.pin5}
          maxLength={1}
          onChange={(e) => {
            if (!/[0-9]/g.test(e.target.value) && e.target.value !== "")
              return e.preventDefault();
            setPin({ ...pin, pin5: e.target.value });
          }}
        />
        <input
          type="text"
          name="input4"
          id="input4"
          className="w-10 rounded-md"
          value={pin.pin6}
          maxLength={1}
          onChange={(e) => {
            if (!/[0-9]/g.test(e.target.value) && e.target.value !== "")
              return e.preventDefault();
            setPin({ ...pin, pin6: e.target.value });
          }}
        />
      </div>
      <Button
        text="Confirm PIN"
        styling="py-2 px-5 bg-[#364968] rounded-md text-white w-full mt-5"
        onClick={() => {
          let fullOtp = "";
          Object.values(pin).forEach((pin) => {
            fullOtp = fullOtp + pin;
          });
          onSubmit(fullOtp);
        }}
      />
    </form>
  );
};

export default PinCode;
