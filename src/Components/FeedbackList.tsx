// import ErrorMessage from "./ErrorMessage";
// import Spinner from "./Spinner";
import { useState } from "react";
import { initialFeedbackItems } from "../lib/constants";
import FeedbackItem from "./FeedbackItem";

export type feedbackItemT = {
  itemId: number;
  bodyText: string;
  itemDate: string;
  upvotes: number;
};

export default function FeedbackList() {
  const [feedbackList, setFeedbackList] =
    useState<feedbackItemT[]>(initialFeedbackItems);

  return (
    <ol className="feedback-list">
      {
        //<Spinner />
        //<ErrorMessage />
      }
      {feedbackList.map((item) => {
        return <FeedbackItem feedbackItem={item} />;
      })}
    </ol>
  );
}
