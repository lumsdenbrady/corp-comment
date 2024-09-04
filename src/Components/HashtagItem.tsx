export default function HashtagItem({companyName, setFilterValue, filterValue}:{companyName:string;filterValue:string; setFilterValue:React.Dispatch<React.SetStateAction<string>>}) {
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
