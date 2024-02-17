import "../assets/css/calendar.scss";
import { weeks, months, getTimeStr } from "../utils/basic";
import { markDay, clearClickMark } from "../utils/calendar";
import leftPicUrl from "../assets/left.png";
import rightPicUrl from "../assets/right.png";
import { useSetting, useSettingDispatch } from "../reducer/settingContext";
import { useEffect, useCallback } from "react";
//prop:month,year
export default function Calendar({ onclick, mode = 1 }) {
  const setting = useSetting();
  const dispatch = useSettingDispatch();
  const { year, month, onDate } = setting;
  const monthEnTxt = months[+month - 1];
  const thWeek = weeks.map((item, index) => <th key={index}>{item}</th>);
  const markClicked = useCallback(
    (year, month) => {
      let strDate = onDate.split("-").join("");
      if (strDate.includes(`${year}${month}`)) {
        const clickedDate = onDate.split("-");
        const _day = clickedDate[2];
        document.querySelector(`[data-day="${_day}"]`).classList.add("click");
      }
    },
    [onDate]
  );
  useEffect(() => {
    markDay(setting.dataList, month);
    markClicked(year, month);
  }, [setting.dataList, month, year, markClicked]);

  function handelClick(e) {
    let onDay = e.target.getAttribute("data-day");
    let onYear = year;
    let onMonth = month;
    clearClickMark();
    if (!onDay) {
      const theElem = e.target.closest(".cframe");
      onDay = theElem.getAttribute("data-day");
      theElem.classList.add("click");
    } else {
      e.target.classList.add("click");
    }
    onclick({ onYear, onMonth, onDay });
  }
  function getDaysMode() {
    let today = getTimeStr("date").split("-");
    let firstDay = new Date(`${year}-${month}-01`).getDay();
    let endDay = new Date(year, month, 0).getDate();
    let cols = firstDay + endDay <= 35 ? 5 : 6; //１號起始日如果從星期五開始，月曆會有六排
    let allDay = Array.from({ length: cols }, () => []);
    allDay = Array.from(allDay, (trItem, index) => {
      let tds = Array(7)
        .fill()
        .map((item, iIndex) => {
          if (index === 0 && iIndex < firstDay) {
            return (
              <td key={iIndex}>
                <div className="cframe"></div>
              </td>
            );
          } else {
            let dateNum = index * 7 + (iIndex - firstDay + 1);
            return (
              <td key={iIndex}>
                <div
                  className={`cframe ${dateNum <= endDay ? "dateNum" : ""} ${
                    dateNum == today[2] && month == today[1] ? "mark" : ""
                  }`}
                  onClick={handelClick}
                  data-day={dateNum <= endDay ? dateNum : ""}
                >
                  {dateNum <= endDay ? dateNum : ""}
                  <div className="mark-list">
                    <span className="diary"></span>
                    <span className="thks"></span>
                  </div>
                </div>
              </td>
            );
          }
        });
      return <tr key={index}>{tds}</tr>;
    });
    return allDay;
  }
  function moveMonth(diret = "right") {
    let newYear = +year;
    let newMonth = +month + 1;
    clearClickMark();
    switch (diret) {
      case "left":
        if (month - 1 < 1) {
          newYear = newYear - 1;
          newMonth = "12";
        } else {
          newMonth = newMonth - 2;
        }
        dispatch({
          type: "moveBack",
          year: `${newYear}`,
          month: `${newMonth}`,
        });
        break;
      case "right":
        if (+month + 1 > 12) {
          newYear = newYear + 1;
          newMonth = "1";
        }
        dispatch({
          type: "moveUp",
          year: `${newYear}`,
          month: `${newMonth}`,
        });
        break;
    }
  }
  return (
    <div className="calendar">
      <div className="cal-header">
        <div className="ar-left" onClick={() => moveMonth("left")}>
          <img src={leftPicUrl} className="arrow" />
        </div>
        <div className="title">
          {month}
          <span>{monthEnTxt}.</span>
        </div>
        <div className="ar-right" onClick={() => moveMonth()}>
          <img src={rightPicUrl} className="arrow" />
        </div>
      </div>
      <table>
        <tbody>
          <tr>{thWeek}</tr>
          {getDaysMode(mode)}
        </tbody>
      </table>
    </div>
  );
}
