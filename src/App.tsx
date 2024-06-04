import "./App.css";
import Container from "./Components/Container";
import Footer from "./Components/Footer";
import HashtagList from "./Components/HashtagList";

export default function App() {
  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}
