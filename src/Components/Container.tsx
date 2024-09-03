import { useState } from "react";
import FeedbackList from "./FeedbackList";
import Header from "./Header";
import { feedbackItemT } from "../App";
import Spinner from "./Spinner";

type containerProps = {
  feedbackList: feedbackItemT[];
  setFeedbackList: React.Dispatch<React.SetStateAction<feedbackItemT[]>>;
  isLoading:boolean;
};

export default function Container({
  feedbackList,
  setFeedbackList,
  isLoading,
}: containerProps) {
  const [inputText, setInputText] = useState<string>("");

  return (
    <div className="container">
      <Header
        setFeedbackList={setFeedbackList}
        inputText={inputText}
        setInputText={setInputText}
      />
     { (isLoading) && <Spinner />}
      <FeedbackList feedbackList={feedbackList} />
    </div>
  );
}
