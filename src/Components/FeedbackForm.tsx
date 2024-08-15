import { MAX_CHARACTER_COUNT } from "../lib/constants";
import { feedbackItemT } from "./Container";

type FeedbackFormProps = {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: React.Dispatch<React.SetStateAction<feedbackItemT[]>>;
};

export default function FeedbackForm({
  inputText,
  setInputText,
  onSubmit,
}: FeedbackFormProps) {
  //input text handling
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= 150) {
      setInputText(value);
    } else {
      return;
    }
  };
  //character count derived from input text state
  const charCountRemaining = MAX_CHARACTER_COUNT - inputText.length;
  //handling the submit of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit((prev) => {
      const currentDate = new Date();
      const newItem = {
        itemId: currentDate.getTime(),
        bodyText: inputText,
        itemDate: currentDate.toString(),
        upvotes: 0,
      };
      const newList = [...prev, newItem];
      console.log(newList);
      return newList;
    });
  };
  return (
    <form className={`form form--valid`} onSubmit={handleSubmit}>
      <textarea
        placeholder="bla"
        id="itemTextArea"
        spellCheck={false}
        value={inputText}
        onChange={handleChange}
      />
      <label htmlFor="itemTextarea">
        Enter your feedback here, remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">{charCountRemaining}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
