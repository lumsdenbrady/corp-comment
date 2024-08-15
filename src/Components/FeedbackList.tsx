// import ErrorMessage from "./ErrorMessage";
// import Spinner from "./Spinner";
import { useState } from "react";

import FeedbackItem from "./FeedbackItem";
import { feedbackListStateT } from "./Container";

export default function FeedbackList({ feedbackList }: feedbackListStateT) {
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
