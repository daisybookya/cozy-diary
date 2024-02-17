import { getTimeStr } from "../utils/basic";
import { useRef, useState } from "react";
export default function DailyQuery({ onSubmit, onCancel }) {
  const inputRef = useRef(null);
  const [showHint, setHint] = useState(false);
  function handleData(e) {
    e.preventDefault();
    const title = document.querySelector('input[name="title"]').value;
    const memo = document.querySelector('input[name="memo"]').value;
    if (!title) {
      setHint(true);
      return inputRef.current.focus();
    }
    setHint(false);
    const dataList = { title, memo };
    const allData = {
      wTime: getTimeStr(),
      wData: dataList,
      wType: 11,
    };
    onSubmit(allData);
  }
  return (
    <form>
      <p>
        <label htmlFor="title">
          記事標題
          <span className={`note ${showHint ? "show" : ""}`}>＊此欄位必填</span>
          <input ref={inputRef} type="text" name="title" autoFocus />
        </label>
      </p>
      <p>
        <label htmlFor="memo">
          備註說明
          <input type="text" name="memo" />
        </label>
      </p>
      <p className="btn-list">
        <button className="btn-sub" onClick={onCancel}>
          取消
        </button>
        <button className="btn-sub" onClick={handleData}>
          確定送出
        </button>
      </p>
    </form>
  );
}
