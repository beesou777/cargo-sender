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

function RadioButtonContainer({ options }: { options: RadioButton[] }) {
  const [selectedValue, setSelectedValue] = React.useState<any>(null);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
  };

  return (
    <div className="radio-button-container">
      {options.map((option, index) => (
        <RadioButton
          key={option.label! + index}
          value={option}
          isSelected={option === selectedValue}
          onSelect={handleSelect}
        >
          {option.label}
        </RadioButton>
      ))}
    </div>
  );
}

export default RadioButtonContainer;
