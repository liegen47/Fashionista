import React, { useState } from "react";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useNavigate } from "react-router-dom";
import api from "@/api";

export default function ImageSearchBox() {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [imagePath, setImagePath] = useState("");

  let navigate = useNavigate();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);

    try {
      var data = await api.searchUpload(bodyFormData);
      setImagePath(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
    if (!loadingUpload && !errorUpload) {
      navigate("/search/image", {
        replace: true,
        state: { searchImagePath: data },
      });
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <input type="file" id="imageFile" onChange={uploadFileHandler}></input>
      {loadingUpload && <LoadingBox></LoadingBox>}
      {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
    </div>
  );
}
