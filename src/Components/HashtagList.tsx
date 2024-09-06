import { useFeedbackItemsContext } from "../lib/hooks";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {

const {companyNames} = useFeedbackItemsContext();
  const uniqueNames = [... new Set(companyNames)] as string[];
  return (
    <ul className="hashtags">
      {uniqueNames.map((item:string)=>{
        return <HashtagItem key={item} companyName={item}/>
      })}
       
      
    </ul>
  );
}
