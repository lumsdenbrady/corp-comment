import { useFeedbackItemsContext } from "../lib/hooks";
import { useFeedbackItemsStore } from "../stores/feedbackItemsSore";

export default function HashtagItem({ companyName }: { companyName: string }) {
  // const {filterValue, setFilterValue} = useFeedbackItemsContext()
  const setFilterValue = useFeedbackItemsStore((state) => state.setFilterValue);

  const handleClick = () => {
    setFilterValue(companyName);

    //   if (filterValue === companyName){
    //     setFilterValue("")
    //   }
    //   else {setFilterValue(companyName)}
    // }
  };
  return (
    <li>
      <button onClick={handleClick}> #{companyName}</button>
    </li>
  );
}
