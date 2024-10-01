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
        className="h-full rounded-none px-2 max-lg:h-[60px] max-lg:w-[60px]"
      >
        -
      </Button>
      <Input
        value={value}
        onChange={handleChange}
        className="number-input-hide-arrows flex h-full w-[75px] rounded-none bg-gray-2 text-center max-lg:w-[161px]"
      />
      <Button
        onClick={increment}
        className="h-full rounded-none px-2 max-lg:h-[60px] max-lg:w-[60px]"
      >
        +
      </Button>
    </div>
  );
}
