import { useContext, useEffect, useState } from "react";
import { feedbackItemT, feedbackListT } from "./types";
import { FeedbackItemsContext } from "../Components/FeedbackItemsContextProvider";


export const refactorItem = (
    text: string,
    itemId?: number,
    itemDate?: number,
    upvotes?: number
   ) => {
    const currentDate = new Date();
    const company = text.split("#")[1].split(" ")[0].split(",")[0];
    const firstChar = company[0].slice(0, 1);
    const newItem: feedbackItemT = {
      itemId: itemId || currentDate.getTime(),
      bodyText: text,
      itemDate: itemDate || currentDate.getTime(),
      upvotes: upvotes || 0,
      badgeLetter: firstChar,
      companyName: company,
    };
    return newItem;
   };




export const useIsLoading = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
return {
    isLoading:isLoading,
    setIsLoading:setIsLoading,
}
}

export const useErrorMessage = () => {
    const [errorMessage, setErrorMessage] = useState<string>("")
return {
    errorMessage:errorMessage,
    setErrorMessage:setErrorMessage
    
}
}
export const useFeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState<feedbackItemT[]>([]);
 const {initialList} = useFetchFeedbacks();
 setFeedbackList(initialList)
  return {
  feedbackList:feedbackList,
  setFeedbackList:setFeedbackList
}
}
export const useFetchFeedbacks = () =>{
   const { setIsLoading} = useIsLoading();
   const { setErrorMessage} = useErrorMessage();
   const [initialList, setInitialList] = useState<feedbackListT>([]);
useEffect(() => {
    setIsLoading(true);
    const fetchInitialItems = async () => {
      try{
      const res = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      const data = await res.json();
      if (!res.ok) {
        return;
      }

        setInitialList(()=>{data.feedbacks.map((item) => {
          const d = new Date();
          const itemDateFull = d.getTime() - item.daysAgo * 86400000;
          return refactorItem(
            item.text,
            item.id,
            itemDateFull,
            item.upvoteCount
          );
        })})
      ;
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setErrorMessage("An error occurred retrieving the data from the server. Please reload the page.")
      setIsLoading(false)
    }
  }
    fetchInitialItems();
   
  }, []);
  return {
    initialList:initialList
  }
}

export const useFeedbackItemsContext = () => {
    const context = useContext(FeedbackItemsContext);
    if (!context){
        throw new Error("FeedbackItemsContext is not defined in this component")
}
return context
}