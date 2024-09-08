import FeedbackItem from "./FeedbackItem";

import { feedbackItemT, feedbackListT } from "../lib/types";

import ErrorMessage from "./ErrorMessage.tsx";
import { useFeedbackItemsContext } from "../lib/hooks.ts";
import { useFeedbackItemsStore } from "../stores/feedbackItemsSore.ts";
type feedbackListPropTypes = {
  filteredFeedbackList: feedbackListT;
};
export default function FeedbackList({
  filteredFeedbackList,
}: feedbackListPropTypes) {
  // const {errorMessage} = useFeedbackItemsContext()
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  return errorMessage ? (
    <ErrorMessage errorMessage={errorMessage} />
  ) : (
    <ol className="feedback-list-container">
      {filteredFeedbackList.map((item: feedbackItemT) => {
        return <FeedbackItem key={item.itemId} feedbackItem={item} />;
      })}
    </ol>
  );
}
