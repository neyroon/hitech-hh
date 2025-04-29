import { StarIcon } from "../icons/star";
import { StarFilledIcon } from "../icons/star-filled";

export const Rating = ({
  count = 5,
  className,
}: {
  count: number;
  className?: string;
}) => {
  const ratingItems = [
    Array(5)
      .fill(1)
      .map((_, i) =>
        i < count ? <StarFilledIcon key={i} /> : <StarIcon key={i} />
      ),
  ];
  return (
    <div className={`flex items-center gap-[2px] ${className}`}>
      {ratingItems}
    </div>
  );
};
