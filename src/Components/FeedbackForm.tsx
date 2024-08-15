import { MAX_CHARACTER_COUNT } from "../lib/constants";
import { headerPropTypes } from "./Header";

export default function FeedbackForm({
  inputText,
  setInputText,
}: headerPropTypes) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= 150) {
      setInputText(value);
    } else {
      return;
    }
  };
  const charCountRemaining = MAX_CHARACTER_COUNT - inputText.length;

  return (
    <form className={`form form--valid`}>
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
