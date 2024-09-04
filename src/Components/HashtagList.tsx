import { feedbackItemT,  feedbackListT } from "../lib/types";
import HashtagItem from "./HashtagItem";

export default function HashtagList({feedbackList, setFilterValue, filterValue}:{feedbackList:feedbackListT;filterValue:string;setFilterValue:React.Dispatch<React.SetStateAction<string>>}) {
  const companyNames = feedbackList.map((item:feedbackItemT)=> item.companyName)
  const uniqueNames = [... new Set(companyNames)] as string[];
  return (
    <ul className="hashtags">
      {uniqueNames.map((item:string)=>{
        return <HashtagItem key={item} filterValue={filterValue} setFilterValue={setFilterValue} companyName={item}/>
      })}
       
      
    </ul>
  );
}
