import React, { ChangeEventHandler } from 'react';
import { Input } from 'components//ui/input';
import { Button } from 'components//ui/button';

type NumberInputProps = {
  value: string;
  setValue(newValue: string): void;
};

export default function NumberInput({ value, setValue }: NumberInputProps) {
  const increment = () => {
    const numericValue = parseFloat(value);
    setValue(String(numericValue + 1));
  };

  const decrement = () => {
    const numericValue = parseFloat(value);
    setValue(numericValue > 0 ? String(numericValue - 1) : '0');
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      setValue(inputValue);
    } else if (inputValue === '') {
      setValue('');
    }
  };

  return (
    <div className="flex max-lg:w-[281px]">
      <Button
        onClick={decrement}
        className="w-[44px] h-[44px] rounded-[8px] bg-[#131313]"
      >
        -
      </Button>
      <Input
        value={value}
        onChange={handleChange}
        className="number-input-hide-arrows w-[69px] h-[44px] px-[10px] flex justify-center py-[10px] items-center text-center gap-[10px]"
      />
      <Button
        onClick={increment}
        className="w-[44px] h-[44px] rounded-[8px] bg-[#131313]"
      >
        +
      </Button>
    </div>
  );
}
