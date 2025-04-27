"use client";
import React, { useState } from "react";

export const Characters = ({ characters }: { characters: any }) => {
  const [countCharacterToShow, setCountCharacterToShow] = useState(5);
  return (
    <div className="flex flex-col gap-[14px] mb-[20px] ">
      {characters.slice(0, countCharacterToShow).map((character) => (
        <div
          key={character.title}
          className="flex justify-between lg:justify-start gap-[25px] pb-[8px] border-b border-dashed border-grey"
        >
          <span className="w-[150px]">{character.title}</span>
          <span>{character.description}</span>
        </div>
      ))}
      {characters.length > 5 && (
        <button
          className="text-grey border-b border-grey border-dashed self-start cursor-pointer"
          onClick={() =>
            setCountCharacterToShow((count) =>
              count === 5 ? characters.length : 5
            )
          }
        >
          Показать все
        </button>
      )}
    </div>
  );
};
