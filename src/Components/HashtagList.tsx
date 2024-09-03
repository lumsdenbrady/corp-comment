import { feedbackItemT, feedbackListStateT } from "../lib/types";
import HashtagItem from "./HashtagItem";

export default function HashtagList({feedbackList}:{feedbackList:feedbackListStateT}) {
  const companyNames = feedbackList.map((item:feedbackItemT)=> item.companyName)
  const uniqueNames = [... new Set(companyNames)] as string[];
  return (
    <ul className="hashtags">
      {uniqueNames.map((item:string)=>{
        return <HashtagItem companyName={item}/>
      })}
       
      
    </ul>
  );
}
