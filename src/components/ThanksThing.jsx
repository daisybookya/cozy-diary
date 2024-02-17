import { questItems } from "../utils/basic";
import "../assets/css/list.scss";
import closeUrl from "../assets/close.png";
export default function ThanksThing({ items, onClose, open }) {
  const list = items["Content"];
  function getKeyName(key) {
    let text = "";
    questItems.forEach((item) => {
      if (item.key === key) {
        text = item.text;
      }
    });
    return text;
  }
  function clickClose() {
    onClose(items["Time"]);
  }
  return (
    <article>
      <span className={`btn-close ${open ? "open" : ""}`} onClick={clickClose}>
        <img src={closeUrl} alt="Close" />
      </span>
      {list.map((thing) => (
        <section className="thks-item" key={thing.id}>
          <p className="descript">＊{getKeyName(thing.key)}</p>
          <p className="content">{thing.content}</p>
        </section>
      ))}
    </article>
  );
}
