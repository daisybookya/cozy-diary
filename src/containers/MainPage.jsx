import "../assets/css/mainPage.scss";
import { useNavigate } from "react-router-dom";
import { getTimeStr } from "../utils/basic";
export default function MainPage() {
  const navigate = useNavigate();
  const day = getTimeStr("day");
  const month = getTimeStr("monthEn");
  function addDiary() {
    navigate("/add");
  }
  return (
    <>
      <div className="page-nav">
        <h1 className="on-date">
          {day}
          <span>/ {month}.</span>
        </h1>
        <div className="daily-nav">
          <button className="btn-pri" onClick={addDiary}>
            新增記事
          </button>
        </div>
      </div>
      <div className="welcome">
        <p>
          今天是{getTimeStr("date")}
          ，歡迎新增記事，若要查看日記內容，請點選左邊月曆，每日格子會標注紀錄的日記類型。
        </p>
        <p>若要調整日記配色及匯出內容，請點選右上角設定。</p>
        <p>若想了解日記使用方法及更多方式，請點選右上角使用範本。</p>
        <figure>
          <figcaption>注意事項：</figcaption>
          <ul className="notice">
            <li>
              Cozy
              Diary日記內容紀錄在瀏覽器裝置上，換裝置後無法從瀏覽器看到相同的日記內容，若要保存內容請按上方設定按鈕輸出日記。
            </li>
            <li>如果使用公共電腦裝置，請勿紀錄私密訊息，以免洩露重要資訊。</li>
          </ul>
        </figure>
      </div>
    </>
  );
}
