"use client";

import { FC, PropsWithChildren, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { getSignature } from "../../../../../../utils/cloudinary";

type FormValuesProps = {
  "upload-videos": FileList;
};
const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
export const FormVideoWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const formMethod = useForm<FormValuesProps>();
  const { handleSubmit } = formMethod;

  const handleUploadVideo: SubmitHandler<FormValuesProps> = async (data) => {
  
    if (!data?.["upload-videos"].length) return; // Validamos que haya un archivo antes de procesarlo

    const { signature, timestamp } = await getSignature();

    const formData = new FormData();

    formData.append("file", data?.["upload-videos"][0]);
    formData.append(
      "api_key",
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
    );
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());
    formData.append("folder", "e-learning");
    formData.append("chunk_size", (20 * 1024 * 1024).toString());

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/upload-video");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("Subida exitosa", xhr.responseText);
      } else {
        console.error("#Error en la subida", xhr.responseText);
      }
    };

    xhr.onerror = () => console.log("Error en la subida");
    xhr.send(formData);
  };

  return (
    <FormProvider {...formMethod}>
      <form onSubmit={handleSubmit(handleUploadVideo)}>{children}</form>
      {uploadProgress > 0 && <div>Progreso {uploadProgress} % </div>}
    </FormProvider>
  );
};
