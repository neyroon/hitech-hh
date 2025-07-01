import { fetchFromServer } from "@/utils/fetch";
import { isMobileDevice } from "@/utils/is-mobile";
import { Reviews } from "./reviews";

export const ReviewsSuspense = async () => {
  const reviews = await fetchFromServer(
    "https://feedbacks-api.wildberries.ru/api/v1/feedbacks",
    {
      isAnswered: true,
      take: 100,
      skip: 0,
    },
    { headers: { Authorization: process.env.NEXT_PUBLIC_WB_TOKEN } }
  );
  const reviewsWithFilter = reviews.data.feedbacks.filter(
    (feedback) =>
      feedback.pros &&
      feedback.cons &&
      feedback.photoLinks &&
      feedback.productValuation === 5
  );
  const isMobile = await isMobileDevice();

  return <Reviews reviews={reviewsWithFilter} isMobile={isMobile} />;
};
