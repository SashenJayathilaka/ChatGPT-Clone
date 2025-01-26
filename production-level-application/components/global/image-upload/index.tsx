"use client";

import { Camera, PhoneOutgoingIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";

declare global {
  var cloudinary: any;
}

type Props = {
  setImageSrc: (image: { secure_url: string }) => void;
  value: string;
};

function ImageUpload({ setImageSrc, value }: Props) {
  /*   const [resource, setResource] = React.useState<any | null>(null);
  console.log("🚀 ~ ImageUpload ~ resource:", resource.secure_url); */
  /*   const handleCallback = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onchange]
  ); */

  return (
    <CldUploadWidget
      //onUpload={handleCallback}
      onSuccess={(result: any, { widget }) => {
        if (result?.info?.secure_url) {
          setImageSrc({ secure_url: result.info.secure_url });
        } else {
          console.error("Upload failed, secure_url not found");
        }
      }}
      uploadPreset="pmapppreset"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 h-96"
          >
            <Camera size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="uploade"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
