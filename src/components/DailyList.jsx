import "../assets/css/list.scss";
import closeUrl from "../assets/close.png";

//prop:list<Array>{title,content,time}
export default function DailyList({ list, onClose, open }) {
  function clickClose() {
    onClose(list["Time"]);
  }
  return (
    <figure>
      <span className={`btn-close ${open ? "open" : ""}`} onClick={clickClose}>
        <img src={closeUrl} alt="Close" />
      </span>
      <figcaption>{list["Content"].title}</figcaption>
      {list["Content"].memo ? <p>{list["Content"].memo}</p> : ""}
    </figure>
  );
}
