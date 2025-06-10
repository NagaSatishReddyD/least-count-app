export default function Dropdown({ onSelect }) {
  const options = [50, 100, 150, 200, 250, 300];

  return (
    <div className="dropdown">
      <label htmlFor="score">Select Max Score: </label>
      <select id="score" onChange={(e) => onSelect(parseInt(e.target.value))}>
        {options.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
