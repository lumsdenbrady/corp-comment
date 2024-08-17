import { useEffect, useState } from "react";
import "./App.css";
import Container from "./Components/Container";
import Footer from "./Components/Footer";
import HashtagList from "./Components/HashtagList";
import { initialFeedbackItems } from "../lib/constants";
export type feedbackItemT = {
  itemId: number;
  bodyText: string;
  itemDate: number;
  upvotes: number;
  badgeLetter: string;
  companyName: string;
};

export type feedbackListStateT = {
  feedbackList?: feedbackItemT[];
  setFeedbackList?: React.Dispatch<React.SetStateAction<feedbackItemT[]>>;
};

export default function App() {
  const [feedbackList, setFeedbackList] = useState<feedbackItemT[]>([]);

  const refactorItem = (
    text: string,
    itemId?: number,
    itemDate?: number,
    upvotes?: number
  ) => {
    const currentDate = new Date();
    const company = text.split("#")[1].split(" ")[0].split(",")[0];
    console.log(company);
    const firstChar = company[0].slice(0, 1);
    const newItem: feedbackItemT = {
      itemId: itemId || currentDate.getTime(),
      bodyText: text,
      itemDate: itemDate || currentDate.getTime(),
      upvotes: upvotes || 0,
      badgeLetter: firstChar,
      companyName: company,
    };
    console.log(newItem);
    return newItem;
  };
  useEffect(() => {
    const fetchInitialItems = async () => {
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
    };

    fetchInitialItems();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container
        feedbackList={feedbackList}
        setFeedbackList={setFeedbackList}
      />
      <HashtagList />
    </div>
  );
}
