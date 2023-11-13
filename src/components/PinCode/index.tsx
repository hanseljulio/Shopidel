import { useEffect, useRef, useState } from "react";
import Button from "../Button";

interface IPinCode {
  onSubmit: (data: string) => void;
}

const PinCode = ({ onSubmit }: IPinCode) => {
  const [pin, setPin] = useState(Array(6).fill(""));
  const [currFocus, setCurrFocus] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [currFocus]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setPin(Array(6).fill(""));
        setCurrFocus(0);
        onSubmit(pin.join(""));
      }}
    >
      <div className="flex gap-x-2">
        {pin.map((_, i) => {
          return (
            <input
              key={i}
              ref={i === currFocus ? inputRef : null}
              type="password"
              name={`inputPin${i}`}
              id={`inputPin${i}`}
              className="w-10 rounded-md"
              value={pin[i]}
              maxLength={i === pin.length - 1 ? 1 : undefined}
              onChange={(e) => {
                if (!/^[0-9]*$/g.test(e.target.value))
                  return e.preventDefault();

                if (e.target.value == "") return;

                if (e.target.value.length > 1) {
                  return setCurrFocus(currFocus + 1);
                }

                pin[i] = e.target.value;
                setPin([...pin]);

                if (currFocus !== pin.length - 1) {
                  return setCurrFocus(currFocus + 1);
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "Backspace") {
                  if (pin[i].length !== 0) {
                    pin[i] = "";
                    return setPin([...pin]);
                  }
                  if (currFocus !== 0) {
                    return setCurrFocus(currFocus - 1);
                  }
                }
              }}
              disabled={currFocus !== i && true}
            />
          );
        })}
      </div>
      <Button
        text="Confirm PIN"
        styling="py-2 px-5 bg-[#364968] rounded-md text-white w-full mt-5"
      />
    </form>
  );
};

export default PinCode;
