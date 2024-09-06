import { createContext } from "react";
import { feedbackItemT, feedbackListT } from "../lib/types";
import { refactorItem, useErrorMessage, useFeedbackList, useFetchFeedbacks, useIsLoading } from "../lib/hooks";

type TFeedbackItemsContext = {
    feedbackList:feedbackListT;
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

const {errorMessage} = useErrorMessage();
const {feedbackList, setFeedbackList} = useFeedbackList();
const {isLoading} = useIsLoading();

const handleAddToList = (inputText:string) =>{

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
      setFeedbackList((prev:feedbackListT) => {
        const newItem:feedbackItemT =  refactorItem(inputText);
       
         const newList = [...prev, newItem];
         console.log(newList);
          //send data to server
        sendNewItem(newItem)
         return newList;
   
       }  )
       console.log(feedbackList)    

}

const companyNames = feedbackList.map((item:feedbackItemT)=> item.companyName)

    return (
        <FeedbackItemsContext.Provider
        value={{
            feedbackList,
            isLoading,
            errorMessage,
            companyNames,
            handleAddToList,
        }} >
        {children}
        </FeedbackItemsContext.Provider>
    )

}
