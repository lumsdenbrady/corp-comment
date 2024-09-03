

import FeedbackItem from "./FeedbackItem";

import { feedbackItemT, feedbackListStateT } from "../lib/types";

import ErrorMessage from "./ErrorMessage.tsx";
type feedbackListPropTypes= {
  feedbackList:feedbackListStateT;
  errorMessage:string;
}
export default function FeedbackList({ feedbackList, errorMessage }: feedbackListPropTypes) {
  return (
    
    (errorMessage) ? 
    (<ErrorMessage errorMessage={errorMessage}/>)
    :(
      <ol className="feedback-list-container">
    
      {feedbackList.map((item: feedbackItemT) => {
        return <FeedbackItem key={item.itemId} feedbackItem={item} />;
      })}
    </ol>
  )
    

  )
}
