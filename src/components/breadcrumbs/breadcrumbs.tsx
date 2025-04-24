import React, { Fragment } from "react";
import { HomeIcon } from "../icons/home";
import Link from "next/link";
import { Section } from "../section";

export const Breadcrumbs = ({
  items = [],
}: {
  items: { text: string; link?: string }[];
}) => {
  return (
    <Section className="py-[14px]">
      <div className="flex gap-[8px] items-center">
        <Link href="/">
          <HomeIcon />
        </Link>
        {items.map((item) => (
          <Fragment key={item.text}>
            {item.link ? (
              <>
                <span className="w-[5px] h-[5px] rounded-full bg-grey"></span>{" "}
                <Link href={item.link} className="text-[14px] text-grey">
                  {item.text}
                </Link>
              </>
            ) : (
              <>
                <span className="w-[5px] h-[5px] rounded-full bg-main2"></span>
                <span key={item.text} className="text-[14px] text-main2">
                  {item.text}
                </span>
              </>
            )}
          </Fragment>
        ))}
      </div>
    </Section>
  );
};
