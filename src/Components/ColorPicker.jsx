import React, { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { setBackgroundColor } from "../redux/slice"; // Adjust the import path as necessary

const ColorPicker = () => {
  const dispatch = useDispatch();
  const selectedColor = useSelector((state) => state.data.backgroundColor);
  const [colors, setColors] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    }

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const handleColorPick = (color) => {
    dispatch(setBackgroundColor(color.hex));
  };

  const handlePickerAccept = (color) => {
    const newColor = color.hex;
    dispatch(setBackgroundColor(newColor));
    if (!colors.includes(newColor)) {
      setColors([newColor, ...colors.slice(0, 4)]);
    }
  };

  const calculatePickerPosition = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const pickerHeight = 248;
    const spaceAboveButton = buttonRect.top;
    const spaceBelowButton = window.innerHeight - buttonRect.bottom;

    if (
      spaceBelowButton >= pickerHeight ||
      spaceBelowButton >= spaceAboveButton
    ) {
      return "calc(100% + 10px)";
    } else {
      return `-${pickerHeight + 50}px`;
    }
  };

  return (
    <div className="relative" ref={pickerRef}>
      <p className="text-xs text-gray-400 mb-2">Choose your color</p>
      <div className="flex items-center">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full mr-2 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => dispatch(setBackgroundColor(color))}
          />
        ))}
        <button
          ref={buttonRef}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
          onClick={() => setShowPicker(!showPicker)}
        >
          +
        </button>
      </div>
      {showPicker && (
        <div
          className="absolute mt-2"
          style={{ top: calculatePickerPosition() }}
        >
          <SketchPicker
            color={selectedColor}
            onChange={handleColorPick}
            onChangeComplete={handlePickerAccept}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
