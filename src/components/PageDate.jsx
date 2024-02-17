import { useSetting } from "../reducer/settingContext";
import { months } from "../utils/basic";
import "../assets/css/mainPage.scss";

export default function PageDate() {
  const setting = useSetting();
  function markDayForm(date) {
    if (date) {
      const dateArry = date.split("-");
      const monthNum = +dateArry[1] - 1;
      return (
        <h1 className="on-date">
          {dateArry[2]}
          <span>/ {months[monthNum]}.</span>
        </h1>
      );
    }
    return "";
  }

  return <>{markDayForm(setting.onDate)}</>;
}
