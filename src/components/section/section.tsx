import React, { ReactNode } from "react";

export const Section = ({
  className,
  id,
  children,
}: {
  className?: string;
  id?: string;
  children?: ReactNode;
}) => {
  return (
    <section
      className={`flex justify-center ${className ? className : ""}`}
      id={id}
    >
      <div className="px-[20px]  w-full xl:px-0 xl:w-[1264px]">{children}</div>
    </section>
  );
};
