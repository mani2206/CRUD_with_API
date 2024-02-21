import "./App.css";
import TableApi from "./components/TableApi";
import Loading from "./components/Loading";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);
  return <div className="App">{isLoading ? <Loading /> : <TableApi />}</div>;
}

export default App;
