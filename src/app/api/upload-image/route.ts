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
      const file = formData.get("image");
   
  
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
        cloudinary.uploader.upload(
          tempFilePath,
          {
            resource_type: "image",
            folder: "e-learning",
            use_filename: true,
            unique_filename: false,
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
  
