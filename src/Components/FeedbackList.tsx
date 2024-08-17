// import ErrorMessage from "./ErrorMessage";
// import Spinner from "./Spinner";

import FeedbackItem from "./FeedbackItem";
import { feedbackListStateT } from "./../App.tsx";
import { feedbackItemT } from "../App";

export default function FeedbackList({ feedbackList }: feedbackListStateT) {
  return (
    <ol className="feedback-list">
      {
        //<Spinner />
        //<ErrorMessage />
      }
      {feedbackList.map((item: feedbackItemT) => {
        return <FeedbackItem key={item.itemId} feedbackItem={item} />;
      })}
    </ol>
  );
}
