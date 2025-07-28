const GridCell = ({ value, onChange }) => {
  return (
    <input
      type="number"
      min="1"
      max="9"
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        if (val === "" || (/^[1-9]$/.test(val) && val.length <= 1)) {
          onChange(val);
        }
      }}
      className="w-16 h-16 text-2xl text-center border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default GridCell;
