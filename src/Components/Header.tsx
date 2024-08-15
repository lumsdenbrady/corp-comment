import { feedbackListStateT } from "./Container";
import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";
export type headerPropTypes = {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
};
export default function Header({
  inputText,
  setInputText,
  setFeedbackList,
}: headerPropTypes & feedbackListStateT) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm
        onSubmit={setFeedbackList}
        inputText={inputText}
        setInputText={setInputText}
      />
    </header>
  );
}
