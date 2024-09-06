import {  useMemo, useState } from "react";
import "./App.css";
import Container from "./Components/Container";
import Footer from "./Components/Footer";
import HashtagList from "./Components/HashtagList";
import {  useFetchFeedbacks } from "./lib/hooks";
import FeedbackItemsContextProvider from "./Components/FeedbackItemsContextProvider"


export default function App() {
const {filteredFeedbackList} = useFetchFeedbacks()


  



  return (
    <div className="app">
      <Footer />
     <FeedbackItemsContextProvider>
      <Container  /> 
      <HashtagList/>
      </FeedbackItemsContextProvider></div>
  );  
}
