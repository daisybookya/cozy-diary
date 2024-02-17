import Container from "../components/Container";
import Calendar from "../components/Calendar";
import { Outlet } from "react-router-dom";
import { dailyType } from "../utils/basic";
import { useSetting, useSettingDispatch } from "../reducer/settingContext";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const Nav = useNavigate();
  const setting = useSetting();
  const dispatch = useSettingDispatch();
  function handleDate(date) {
    const { onYear, onMonth, onDay } = date;
    const theDay = `${onYear}-${onMonth}-${onDay}`;
    dispatch({
      type: "markDate",
      onDate: theDay,
    });
    Nav(`/day`);
  }
  return (
    <Container>
      <div className="main-container">
        <div className="page">
          <div className="head">
            <span>{setting.year}</span>
            <ul className="daily-list">
              {dailyType.map((daily) => (
                <li key={daily.id}>
                  <b>{daily.icon}</b>
                  {daily.name}
                </li>
              ))}
            </ul>
          </div>
          <Calendar onclick={handleDate}></Calendar>
        </div>
      </div>
      <div className="main">
        <div className="main-content">
          <Outlet></Outlet>
        </div>
      </div>
    </Container>
  );
}
