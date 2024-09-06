import {  useMemo, useState } from "react";
import "./App.css";
import Container from "./Components/Container";
import Footer from "./Components/Footer";
import HashtagList from "./Components/HashtagList";
import {  useFeedbackList, useFetchFeedbacks } from "./lib/hooks";
import FeedbackItemsContextProvider from "./Components/FeedbackItemsContextProvider"


export default function App() {
const [filterValue, setFilterValue] = useState<string>("")
const {feedbackList} = useFeedbackList()


  

const filteredFeedbackList = useMemo(()=>{
  if(filterValue) {return [...feedbackList].filter((item)=>{
    return item.companyName === filterValue;
  })}else return feedbackList
},[filterValue,feedbackList])


  return (
    <div className="app">
      <Footer />
     <FeedbackItemsContextProvider>
      <Container filteredFeedbackList={filteredFeedbackList} /> 
      <HashtagList filterValue = {filterValue} setFilterValue={setFilterValue}/>
      </FeedbackItemsContextProvider></div>
  );  
}
