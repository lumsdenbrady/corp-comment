import { MAX_CHARACTER_COUNT } from "../lib/constants";
import {  useFeedbackItemsContext } from "../lib/hooks.ts";
import { useState } from "react";


export default function FeedbackForm() {
  const [inputText, setInputText] = useState<string>("");
  const {handleAddToList} = useFeedbackItemsContext();

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
    if (inputText.includes('#')){
      setValid(true)
      handleAddToList(inputText)
      setInputText("");

      setTimeout(()=>{
        setValid(false)
        setInvalid(false)
      }, 2000)

  ;}
    else {
      setInvalid(true)
      setTimeout(()=>{
        setValid(false)
        setInvalid(false)
      }, 2000)
      return
    };
  };
//show validity of submission text
const [valid, setValid] = useState<boolean>();
const [invalid, setInvalid] = useState<boolean>();


  return (
    <form className={`form 
    ${valid && ` form--valid`}
    ${invalid && ` form--invalid`}

    }
    
    `} onSubmit={handleSubmit} >
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
