import { MAX_CHARACTER_COUNT } from "../lib/constants";
import {  refactorItem, sendNewItem } from "../App.tsx";
import {feedbackItemT} from "../lib/types.ts"
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
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit((prev) => {
     const newItem:feedbackItemT =  refactorItem(inputText);
     //send data to server
     sendNewItem(newItem)
      const newList = [...prev, newItem];
      console.log(newList);
      setInputText("");
      return newList;

    });
  };
  return (
    <form className={`form form--valid`} onSubmit={handleSubmit} >
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
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
