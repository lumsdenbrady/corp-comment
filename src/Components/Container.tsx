import { useState } from "react";
import FeedbackList from "./FeedbackList";
import Header from "./Header";

export default function Container() {
  const [inputText, setInputText] = useState<string>("");
  return (
    <div className="container">
      <Header inputText={inputText} setInputText={setInputText} />
      <FeedbackList />
    </div>
  );
}
