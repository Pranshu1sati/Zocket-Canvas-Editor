// src/components/CanvasComponent.jsx

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CanvasActions from "../CanvasActions.js";

const Canvas = () => {
  const canvasRef = useRef(null);
  const canvasActionsRef = useRef(null);

  const data = useSelector((state) => state.data);

  useEffect(() => {
    if (!canvasActionsRef.current) {
      const canvas = canvasRef.current;
      canvasActionsRef.current = new CanvasActions(canvas);
    }
    canvasActionsRef.current.setData(data);
  }, [data]);

  return (
    <div className="grid place-items-center">
      <canvas
        className="w-[400px] h-[400px] rounded-md border-2-black-solid"
        ref={canvasRef}
        width={1080}
        height={1080}
        // style={{ height: 400, width: 400 }}
      ></canvas>
    </div>
  );
};

export default Canvas;
