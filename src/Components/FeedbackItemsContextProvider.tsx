import { createContext, SetStateAction, useMemo, useState } from "react";
import { feedbackItemT, feedbackListT } from "../lib/types";
import { refactorItem, useFetchFeedbacks } from "../lib/hooks";

type TFeedbackItemsContext = {
    feedbackList:feedbackListT;
    filteredFeedbackList:feedbackListT;
    setFilterValue:React.Dispatch<SetStateAction<string>>;
    filterValue:string;
    isLoading: boolean;
    errorMessage:string;
    companyNames: string[];
    handleAddToList: (text:string) => void;
}
type FeedbackItemsContextProviderProps ={
    children: React.ReactNode;
}


export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(null);
export default function FeedbackItemsContextProvider({children}: FeedbackItemsContextProviderProps){


const {feedbackList, setFeedbackList, isLoading, errorMessage} = useFetchFeedbacks();

const handleAddToList =  (inputText:string) =>{

     const sendNewItem = async (item:feedbackItemT) => {
        const today = new Date();
        const differenceInTime = today.getTime() - item.itemDate;
        const days = Math.round(differenceInTime / (1000 * 3600 * 24));
        const apiRefactoredItem = {
          "id":item.itemId,
          "company":item.companyName,
          "badgeLetter":item.badgeLetter,
          "upvoteCount":item.upvotes,
          "daysAgo":days,
          "text":item.bodyText,
        }
        try{
        const res = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",{
          method:"POST",
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(apiRefactoredItem)
        })
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          console.log(res);
          return;
        }
        } catch(error:unknown) {
          console.log(error)
        }
      
      }
      const newItem:feedbackItemT =  refactorItem(inputText);

      setFeedbackList((prev:feedbackListT) => {
       
        const newList = [...prev, newItem];
        console.log(newList);
        return newList;
  
      }  )
      //send data to server
      sendNewItem(newItem)
      
      
      

}
const [filterValue, setFilterValue] = useState<string>("")

const filteredFeedbackList = useMemo(()=>{
  if(filterValue) {return [...feedbackList].filter((item)=>{
    return item.companyName === filterValue;
  })}else return feedbackList
},[filterValue,feedbackList])
const companyNames = feedbackList.map((item:feedbackItemT)=> item.companyName)

    return (
        <FeedbackItemsContext.Provider
        value={{
            feedbackList,
            filteredFeedbackList,
            setFilterValue,
            filterValue,
            isLoading,
            errorMessage,
            companyNames,
            handleAddToList,
        }} >
        {children}
        </FeedbackItemsContext.Provider>
    )

}
