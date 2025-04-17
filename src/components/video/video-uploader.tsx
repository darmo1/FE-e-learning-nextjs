"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { FileVideo, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFormContext } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { Conditional } from "../common/conditional";

export function VideoUploader() {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();
  const { pending } = useFormStatus();
  const previewVideo = watch("upload-video");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // Simulate upload
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files;
      simulateUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files;
      simulateUpload(file);
    }
  };

  const simulateUpload = (fileList: FileList) => {
    const file = fileList[0];
    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setValue("upload-video", file, { shouldValidate: true });
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const PreviewModeVideo = () => {
    if (!(previewVideo instanceof File)) return null;
    const videoURL = URL.createObjectURL(previewVideo);
    return (
      <div className="mt-4 w-full">
        <video
          controls
          src={videoURL}
          className="w-full max-h-64 rounded-md border"
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Vista previa del video cargado
        </p>
        <button onClick={() => setValue("upload-video", undefined)}>
          Cambiar video
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (!(previewVideo instanceof File)) return;

    const videoURL = URL.createObjectURL(previewVideo);
    return () => URL.revokeObjectURL(videoURL);
  }, [previewVideo]);

  return (
    <Card className="border-gray-300">
      <Conditional test={previewVideo instanceof File}>
        <PreviewModeVideo />
      </Conditional>
      <Conditional test={!(previewVideo instanceof File)}>
        <CardHeader>
          <CardTitle>Subir Video</CardTitle>
          <CardDescription>
            Arrastra y suelta tu video o haz clic para seleccionar un archivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`relative flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            {isUploading || pending ? (
              <div className="flex w-full flex-col items-center gap-4">
                <FileVideo className="h-10 w-10 text-muted-foreground" />
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Subiendo video... {progress}%
                </p>
              </div>
            ) : (
              <>
                <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
                <p className="mb-2 text-sm font-medium">
                  Arrastra tu video aquí o haz clic para explorar
                </p>
                <p className="text-xs text-muted-foreground">
                  Soporta MP4, MOV, AVI (máx. 2GB)
                </p>
                <input
                  {...register("upload-video", {
                    onChange: handleFileSelect,
                  })}
                  id="file-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                />
              </>
            )}
          </div>
          <Conditional
            test={Boolean(
              errors?.["upload-video"]?.message
                ? String(errors?.["upload-video"]?.message)
                : ""
            )}
          >
            <div className="font-semibold text-red-500">
              {String(errors?.["upload-video"]?.message)}
            </div>
          </Conditional>
        </CardContent>
      </Conditional>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          {" "}
          Asegúrate de tener los derechos de los videos que subas
        </p>
        <input type="submit" value="Enviar" disabled={pending} />

        <Button variant="outline" size="sm" disabled={isUploading}>
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  );
}
