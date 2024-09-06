import FeedbackList from "./FeedbackList";
import Header from "./Header";
import {  feedbackListT } from "../lib/types.ts";
import Spinner from "./Spinner";
import { useFeedbackItemsContext } from "../lib/hooks.ts";



export default function Container({filteredFeedbackList}:{filteredFeedbackList:feedbackListT}) {
  const {isLoading} = useFeedbackItemsContext()

  return (
    <div className="container">
      <Header
      
      />
     { (isLoading) && <Spinner />}
 
      <FeedbackList filteredFeedbackList={filteredFeedbackList} />
    </div>
  );
}
