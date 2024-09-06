import FeedbackList from "./FeedbackList";
import Header from "./Header";
import Spinner from "./Spinner";
import { useFeedbackItemsContext } from "../lib/hooks.ts";



export default function Container() {
  const {isLoading, filteredFeedbackList} = useFeedbackItemsContext()

  return (
    <div className="container">
      <Header
      
      />
     { (isLoading) && <Spinner />}
 
      <FeedbackList filteredFeedbackList={filteredFeedbackList} />
    </div>
  );
}
