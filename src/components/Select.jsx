import { dailyType } from "../utils/basic";
export default function Select({ onSelect, checked }) {
  function handleOpt(types) {
    return types.map((item) => (
      <option value={item.id} key={item.id}>
        {item.name}
      </option>
    ));
  }
  return (
    <select name="d-type" onChange={onSelect} defaultValue={checked}>
      {handleOpt(dailyType)}
    </select>
  );
}
