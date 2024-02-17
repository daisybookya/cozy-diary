import "../assets/css/Layout.scss";
import { useSetting } from "../reducer/settingContext";
import { useEffect } from "react";
// props:theme
export default function Layout({ children }) {
  const set = useSetting();
  useEffect(() => {}, [set.theme]);
  return <div className={`layout ${set.theme}`}>{children}</div>;
}
