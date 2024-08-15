import { feedbackItemT } from "./FeedbackList";

export default function FeedbackItem({
  feedbackItem,
}: {
  feedbackItem: feedbackItemT;
}) {
  const company = feedbackItem.bodyText.split("#")[1].split(" ")[0];

  const firstChar = company[0].slice(0, 1);
  const daysOld = () => {
    const itemDate = new Date(feedbackItem.itemDate);
    const today = new Date();
    const differenceInTime = today.getTime() - itemDate.getTime();
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
        <p>{firstChar}</p>
      </div>
      <div>
        <p>{company}</p>
        <p>{feedbackItem.bodyText}</p>
      </div>
      <p>{daysOld()}d</p>
    </li>
  );
}
