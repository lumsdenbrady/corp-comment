import { useFeedbackItemsContext } from "../lib/hooks";

export default function HashtagItem({companyName}:{companyName:string;}) {
  const {filterValue, setFilterValue} = useFeedbackItemsContext()
  
  const handleClick = ()=>{
    if (filterValue === companyName){
      setFilterValue("")
    }
    else {setFilterValue(companyName)}
  }
  return (
    <li>
      <button onClick={handleClick}> #{companyName}</button>
    </li>
  ); 
}
