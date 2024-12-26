"use client";
import clsx from "clsx";
import React from "react";

import "./style.scss";

type RadioButton = {
  isSelected?: boolean;
  value?: any;
  children?: React.ReactNode;
  label?: string;
  className?: string;
  onSelect?: (value: any) => void;
};

function RadioButton({
  isSelected,
  value,
  children,
  className,
  onSelect,
}: RadioButton) {
  const handleClick = () => {
    onSelect && onSelect(value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "radio-button w-full sm:w-fit",
        isSelected && "radio-button-active",
        className
      )}
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
  className,
}: {
  options: RadioButton[];
  value?: string;
  error?: string;
  className?: string;
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
      <div className="radio-button-container flex-wrap">
        {options.map((option, index) => (
          <RadioButton
            key={option.label! + index}
            value={option.value}
            className={className}
            isSelected={option.value === value || false}
            onSelect={handleSelect}
          >
            {option.label}
          </RadioButton>
        ))}
      </div>
      {error && (
        <div className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}

export default RadioButtonContainer;
