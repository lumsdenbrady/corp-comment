import { useState } from "react";
import FeedbackList from "./FeedbackList";
import Header from "./Header";
import { feedbackItemT } from "../App";

type containerProps = {
  feedbackList: feedbackItemT[];
  setFeedbackList: React.Dispatch<React.SetStateAction<feedbackItemT[]>>;
};

export default function Container({
  feedbackList,
  setFeedbackList,
}: containerProps) {
  const [inputText, setInputText] = useState<string>("");

  return (
    <div className="container">
      <Header
        setFeedbackList={setFeedbackList}
        inputText={inputText}
        setInputText={setInputText}
      />
      <FeedbackList feedbackList={feedbackList} />
    </div>
  );
}
