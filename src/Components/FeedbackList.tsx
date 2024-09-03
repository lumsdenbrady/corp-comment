

import FeedbackItem from "./FeedbackItem";
import { feedbackListStateT } from "./../App.tsx";
import { feedbackItemT } from "../App";
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
