import "./App.css";
import Container from "./Components/Container";
import Footer from "./Components/Footer";
import HashtagList from "./Components/HashtagList";
import FeedbackItemsContextProvider from "./Components/FeedbackItemsContextProvider";
import { useFeedbackItemsStore } from "./stores/feedbackItemsSore";
import { useEffect } from "react";

export default function App() {
  const fetchFeedbackList = useFeedbackItemsStore(
    (state) => state.fetchFeedbackList
  );
  // fetchFeedbackList;
  useEffect(() => {
    fetchFeedbackList();
    console.log(fetchFeedbackList);
  }, [fetchFeedbackList]);

  return (
    <div className="app">
      <Footer />
      {/* <FeedbackItemsContextProvider> */}
      <Container />
      <HashtagList />
      {/* </FeedbackItemsContextProvider> */}
    </div>
  );
}
