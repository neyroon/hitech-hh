"use client";

import { UploadIcon } from "@/components/icons/upload";
import { useMask } from "@react-input/mask";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

export const Form = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [selectedPhotoCheck, setSelectedPhotoCheck] = useState<File | null>(
    null
  );

  const previewPhotoRef = useRef<string | null>(null);
  const previewPhotoCheckRef = useRef<string | null>(null);

  const inputRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
  });

  useEffect(() => {
    return () => {
      if (previewPhotoRef.current) URL.revokeObjectURL(previewPhotoRef.current);
      if (previewPhotoCheckRef.current)
        URL.revokeObjectURL(previewPhotoCheckRef.current);
      previewPhotoRef.current = null;
      previewPhotoCheckRef.current = null;
    };
  }, []);

  const handlePhotoSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (previewPhotoRef.current) {
      URL.revokeObjectURL(previewPhotoRef.current);
      previewPhotoRef.current = null;
    }

    setSelectedPhoto(event.target.files[0]);

    previewPhotoRef.current = URL.createObjectURL(event.target.files[0]);
  };

  const handlePhotoCheckSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (previewPhotoCheckRef.current) {
      URL.revokeObjectURL(previewPhotoCheckRef.current);
      previewPhotoCheckRef.current = null;
    }

    setSelectedPhotoCheck(event.target.files[0]);

    previewPhotoCheckRef.current = URL.createObjectURL(event.target.files[0]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/callback", {
        method: "POST",
        body: form,
      });
      if (res.status === 200) setIsSuccess(true);
      else setIsError(true);
    } catch (e) {
      console.log(e);
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[20px]">
        <input
          type="text"
          placeholder="Ваше имя"
          name="name"
          className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
        />
        <input
          type="tel"
          placeholder="Ваш номер телефона"
          ref={inputRef}
          name="phone"
          className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
        />
        <textarea
          placeholder="Опишите проблему"
          name="problem"
          className="text-[16px] p-[15px] bg-bg-grey w-full text-main2 placeholder:text-grey rounded-[6px]"
        />
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[20px]">
        <label className="flex items-center gap-[8px] text-grey hover:text-bg-red cursor-pointer p-[10px] rounded-[6px] bg-bg-grey">
          {!previewPhotoRef.current ? (
            <UploadIcon />
          ) : (
            <Image
              src={previewPhotoRef.current}
              width={24}
              height={24}
              className="rounded-full w-[24px] h-[24px]"
              alt="Загруженно изображение"
            />
          )}
          <span className="text-black">Прикрепить изображение</span>
          <input
            id="uploadFile"
            type="file"
            name="imageFile"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoSelect}
          />
        </label>
        <label className="flex items-center gap-[8px] text-grey hover:text-bg-red cursor-pointer p-[10px] rounded-[6px] bg-bg-grey">
          {!previewPhotoCheckRef.current ? (
            <UploadIcon />
          ) : (
            <Image
              src={previewPhotoCheckRef.current}
              width={24}
              height={24}
              className="rounded-full w-[24px] h-[24px]"
              alt="Загруженно изображение"
            />
          )}
          <span className="text-black">Прикрепить чек</span>
          <input
            id="uploadFile"
            type="file"
            accept="image/*"
            name="imageCheckFile"
            className="hidden"
            onChange={handlePhotoCheckSelect}
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-bg-red flex justify-center items-center lg:w-[213px] h-[45px] rounded-[4px] text-white text-[18px] font-medium hover:bg-main2 transition-colors duration-300"
      >
        Отправить
      </button>
    </form>
  );
};
