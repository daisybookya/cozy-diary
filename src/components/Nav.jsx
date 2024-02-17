import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <header className="nav">
      <div className="logo">
        <Link to="/home">Cozy Diary</Link>
      </div>
      <ul>
        <li>
          <Link to="/sample">使用範本</Link>
        </li>
        <li>
          <Link to="/setting">設定</Link>
        </li>
      </ul>
    </header>
  );
}
