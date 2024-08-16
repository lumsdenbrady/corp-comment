import { useEffect } from "react";
import "./App.css";
import Container from "./Components/Container";
import Footer from "./Components/Footer";
import HashtagList from "./Components/HashtagList";

export default function App() {
  useEffect(() => {
    const fetchInitialItems = async () => {
      const res = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
        return;
      }
      console.log(data);
    };
    fetchInitialItems();
  }, []);
  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}
