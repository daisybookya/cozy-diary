import "../assets/css/mainPage.scss";
export default function Modal({ open = false, children }) {
  return (
    <div className={`layer ${open ? "open" : ""}`}>
      <div className="modal">{children}</div>
    </div>
  );
}
