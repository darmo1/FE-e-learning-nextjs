import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
      const formData = await req.formData();
      const file = formData.get("upload-video");
   
  
      if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { error: "No se recibió ningún archivo" },
          { status: 400 }
        );
      }
  
      // Convertir el File a Buffer y guardarlo temporalmente
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const tempFilePath = path.join(os.tmpdir(), file.name);
  
      fs.writeFileSync(tempFilePath, buffer);
  
      // Usar callback para capturar el resultado final de la subida
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(
          tempFilePath,
          {
            resource_type: "video",
            folder: "e-learning",
            chunk_size: 20 * 1024 * 1024, // 20 MB
          },
          (error, result) => {
            // Eliminar el archivo temporal, sin importar el resultado
            fs.unlinkSync(tempFilePath);
  
            if (error) {
              console.error("Error al subir el video:", error);
              return reject(error);
            }
            // Aquí 'result' es el objeto final con detalles del upload
            resolve(result);
          }
        );
      });
  
      return NextResponse.json(uploadResult, { status: 200 });
    } catch (error) {
      console.error("Error al subir el video:", error);
      return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
  }
  
