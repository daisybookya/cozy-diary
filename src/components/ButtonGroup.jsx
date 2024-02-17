import "../assets/css/setting.scss";
import { useState } from "react";

export default function ButtonGroup({ obj, defaultValue, onSelect }) {
  //obj:[{name:'',value:''}]
  const [selected, setSelected] = useState(defaultValue);
  function handleSelect(e) {
    const value = e.target.getAttribute("data-value");
    setSelected(value);
    onSelect(value);
  }
  return (
    <div className="btn-group">
      {obj.map((list, index) => (
        <div
          onClick={handleSelect}
          data-value={`${list.value}`}
          className={`btn-g-b ${list.value == selected ? "checked" : ""}`}
          key={index}
        >
          {list.name}
        </div>
      ))}
    </div>
  );
}
