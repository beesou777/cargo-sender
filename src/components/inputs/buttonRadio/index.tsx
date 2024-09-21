"use client";
import clsx from "clsx";
import React from "react";

import "./style.scss";

type RadioButton = {
  isSelected?: boolean;
  value?: any;
  children?: React.ReactNode;
  label?: string;
  onSelect?: (value: any) => void;
};

function RadioButton({ isSelected, value, children, onSelect }: RadioButton) {
  const handleClick = () => {
    onSelect && onSelect(value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx("radio-button", isSelected && "radio-button-active")}
    >
      {children}
    </button>
  );
}

function RadioButtonContainer({
  options,
  onChange,
  error,
  value,
}: {
  options: RadioButton[];
  value?: string;
  error?: string;
  onChange?: (data: string) => void;
}) {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(
    value || null
  );

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    if (!onChange) return;
    onChange(value);
  };

  return (
    <div className="grid gap-2">
      <div className="radio-button-container">
        {options.map((option, index) => (
          <RadioButton
            key={option.label! + index}
            value={option.value}
            isSelected={option.value === value || false}
            onSelect={handleSelect}
          >
            {option.label}
          </RadioButton>
        ))}
      </div>
      {error && (
        <div className="bg-red-100 py-1 px-2 text-red-500 text-xs font-semibold rounded">
          {error}
        </div>
      )}
    </div>
  );
}

export default RadioButtonContainer;
