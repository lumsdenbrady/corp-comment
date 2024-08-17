import { feedbackItemT } from "../App";

export default function FeedbackItem({
  feedbackItem,
}: {
  feedbackItem: feedbackItemT;
}) {
  const daysOld = () => {
    const today = new Date();
    const differenceInTime = today.getTime() - feedbackItem.itemDate;
    const days = Math.round(differenceInTime / (1000 * 3600 * 24));
    return days;
  };
  return (
    <li className={`feedback `}>
      <button>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
        </svg>
        <span>{feedbackItem.upvotes}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.companyName}</p>
        <p>{feedbackItem.bodyText}</p>
      </div>
      <p>{daysOld()}d</p>
    </li>
  );
}
