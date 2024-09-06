import { useFeedbackItemsContext } from "../lib/hooks";
import HashtagItem from "./HashtagItem";

export default function HashtagList({ setFilterValue, filterValue}:{filterValue:string;setFilterValue:React.Dispatch<React.SetStateAction<string>>}) {

const {companyNames} = useFeedbackItemsContext();
  const uniqueNames = [... new Set(companyNames)] as string[];
  return (
    <ul className="hashtags">
      {uniqueNames.map((item:string)=>{
        return <HashtagItem key={item} filterValue={filterValue} setFilterValue={setFilterValue} companyName={item}/>
      })}
       
      
    </ul>
  );
}
