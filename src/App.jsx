import { useRoutes } from "react-router-dom";
import { router } from "./router";
import "./App.css";

function App() {
  let element = useRoutes(router);
  return <>{element}</>;
}

export default App;
