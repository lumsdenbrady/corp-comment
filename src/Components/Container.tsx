import FeedbackList from "./FeedbackList";
import Header from "./Header";
import Spinner from "./Spinner";
import { useFeedbackItemsContext } from "../lib/hooks.ts";
import { useFeedbackItemsStore } from "../stores/feedbackItemsSore.ts";

export default function Container() {
  // const {isLoading, filteredFeedbackList} = useFeedbackItemsContext()
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const filteredFeedbackList = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbackList()
  );
  return (
    <div className="container">
      <Header />
      {isLoading && <Spinner />}

      <FeedbackList filteredFeedbackList={filteredFeedbackList} />
    </div>
  );
}
