import { useState } from "react";
import FeedbackList from "./FeedbackList";
import Header from "./Header";
import { initialFeedbackItems } from "../lib/constants";
export type feedbackItemT = {
  itemId: number;
  bodyText: string;
  itemDate: string;
  upvotes: number;
};
export type feedbackListStateT = {
  feedbackList?: feedbackItemT[];
  setFeedbackList?: React.Dispatch<React.SetStateAction<feedbackItemT[]>>;
};

export default function Container() {
  const [inputText, setInputText] = useState<string>("");
  const [feedbackList, setFeedbackList] =
    useState<feedbackItemT[]>(initialFeedbackItems);
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
