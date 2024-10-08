import { useState } from "react";
import { feedbackItemT } from "../lib/types";

export default function FeedbackItem({
  feedbackItem,
}: {
  feedbackItem: feedbackItemT;
}) {
  const daysOld = () => {
    const today = new Date();
    const differenceInTime = today.getTime() - feedbackItem.itemDate;
    const days = Math.round(differenceInTime / (1000 * 3600 * 24));
    if (days === 0){return "new"}
    else{
    return `${days}d`;}
  };
//handle toggle of item when clicked on
const [expanded, setExpanded] = useState(false)
const handleClick = ()=>{
setExpanded((prev)=>!prev)
}
//handle upvote click
const [upvote, setUpvote] = useState(feedbackItem.upvotes)
const handleUpvote = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
  e.stopPropagation();
  e.currentTarget.disabled = true;
setUpvote((prev)=>prev+1)
}

  return (
    <li className={`feedback ${expanded&& `feedback--expand`}`} onClick={handleClick}>
      <button onClick={handleUpvote}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
        </svg>
        <span>{upvote}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.companyName}</p>
        <p>{feedbackItem.bodyText}</p>
      </div>
      <p>{daysOld()}</p>
    </li>
  );
}
