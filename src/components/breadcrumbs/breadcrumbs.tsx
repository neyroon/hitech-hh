import Link from "next/link";
import { Fragment } from "react";
import { HomeIcon } from "../icons/home";
import { Section } from "../section";

export const Breadcrumbs = ({
  items = [],
}: {
  items: { text: string; link?: string }[];
}) => {
  return (
    <Section className="py-[14px]">
      <div className="flex flex-wrap gap-[8px] items-center">
        <Link
          href="/"
          className="text-grey hover:text-bg-red transition-colors duration-300"
        >
          <HomeIcon />
        </Link>
        {items.map((item) => (
          <Fragment key={item.text}>
            {item.link ? (
              <>
                <span className="w-[5px] h-[5px] rounded-full bg-grey"></span>
                <Link href={item.link} className="text-[14px] text-grey">
                  {item.text}
                </Link>
              </>
            ) : (
              <div className="flex  gap-[8px] items-center">
                <span className="w-[5px] h-[5px] rounded-full shrink-0 bg-main2"></span>
                <span key={item.text} className="text-[14px] text-main2">
                  {item.text}
                </span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Section>
  );
};
