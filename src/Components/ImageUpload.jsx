import React from "react";
import { setUserImage } from "../redux/slice";

import { useDispatch, useSelector } from "react-redux";
import { LuImagePlus } from "react-icons/lu";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const userImage = useSelector((state) => state.data.urls.userImage);
  const handleFileChange = (event) => {
    //only 1 file is being set
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setUserImage(reader.result)); // Dispatch the image data as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileLinkClick = () => {
    document.getElementById("file-upload").click();
  };
  console.log(userImage);
  return (
    <div>
      <p className="text-gray-400 text-sm item-center font-poppins">
        <LuImagePlus
          name="upload"
          strokeWidth={2}
          color="#4461f2"
          className="inline-block mr-2"
        />
        Change the ad creative image.{" "}
        <button
          className="text-blue-500 underline"
          onClick={handleFileLinkClick}
        >
          select file
        </button>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </p>
    </div>
  );
};

export default ImageUpload;
