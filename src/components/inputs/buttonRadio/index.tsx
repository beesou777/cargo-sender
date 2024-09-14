"use client";
import clsx from "clsx";
import React from "react";

import { cargoTypes } from "@/store/cargo";
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
}: {
  options: RadioButton[];
  value?: cargoTypes;
  error?: string;
  onChange?: (data: cargoTypes) => void;
}) {
  const [selectedValue, setSelectedValue] = React.useState<cargoTypes>();

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    if (!onChange) return;
    if (value !== "box") {
      onChange("Package");
    } else {
      onChange(value);
    }
  };

  return (
    <div className="grid gap-2">
      <div className="radio-button-container">
        {options.map((option, index) => (
          <RadioButton
            key={option.label! + index}
            value={option.value}
            isSelected={option.value === selectedValue || false}
            onSelect={handleSelect}
          >
            {option.label}
          </RadioButton>
        ))}
      </div>
      {error && (
        <div className="bg-red-100 py-2 px-4 text-red-500 text-xs font-semibold">
          {error}
        </div>
      )}
    </div>
  );
}

export default RadioButtonContainer;
