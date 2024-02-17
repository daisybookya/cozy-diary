import { getTimeStr, questItems } from "../utils/basic";
import { useState } from "react";

function ThanksQuest({ text, children }) {
  return (
    <section className="thks-item">
      <p>{text}</p>
      {children}
    </section>
  );
}
export default function ThanksQuery({ onSubmit, onCancel }) {
  const [showHint, setHint] = useState(false);
  const questList = questItems.map((item, index) => (
    <ThanksQuest key={index} text={item.text}>
      {
        <textarea
          name="thks"
          data-key={item.key}
          cols="30"
          rows="5"
          required
        ></textarea>
      }
    </ThanksQuest>
  ));
  function handleData(e) {
    e.preventDefault();
    const textareaList = document.querySelectorAll('[name = "thks"]');
    for (let i = 0, len = textareaList.length; i < len; i++) {
      if (!textareaList[i].value.length) {
        setHint(true);
        textareaList[i].focus();
        return false;
      }
    }
    setHint(false);
    const dataList = questItems.map((item, index) => {
      return {
        id: `thks${index}`,
        key: item.key,
        content: textareaList[index].value,
      };
    });
    const allData = {
      wTime: getTimeStr(),
      wData: dataList,
      wType: 12,
    };
    onSubmit(allData);
  }
  return (
    <form>
      {questList}
      <p>
        <span className={`note ${showHint ? "show" : ""}`}>＊所有欄位必填</span>
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
