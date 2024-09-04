import { useEffect, useState } from "react";
import "./App.css";
import Container from "./Components/Container";
import Footer from "./Components/Footer";
import HashtagList from "./Components/HashtagList";
import { feedbackItemT } from "./lib/types";


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
export const sendNewItem = async (item:feedbackItemT) => {
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

export default function App() {
  const [feedbackList, setFeedbackList] = useState<feedbackItemT[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [errorMessage, setErrorMessage] = useState<string>("")
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

      setFeedbackList(() =>
        data.feedbacks.map((item) => {
          const d = new Date();
          const itemDateFull = d.getTime() - item.daysAgo * 86400000;
          return refactorItem(
            item.text,
            item.id,
            itemDateFull,
            item.upvoteCount
          );
        })
      );
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setErrorMessage("An error occurred retrieving the data from the server. Please reload the page.")
      setIsLoading(false)
    }
  }
    fetchInitialItems();
   
  }, []);

  return (
    <div className="app">
      <Footer />
     
      <Container
      errorMessage={errorMessage}
      isLoading={isLoading}
        feedbackList={feedbackList}
        setFeedbackList={setFeedbackList}
      /> 
      <HashtagList feedbackList={feedbackList}/>
    </div>
  );  
}
