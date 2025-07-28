const NoteBox = () => {
  return (
    <div className="w-full md:w-96 bg-white rounded-xl shadow-lg border border-indigo-300 p-4">
      <label className="block mb-2 text-lg font-semibold text-indigo-700">
        📓 Tus Anotaciones
      </label>
      <textarea
        rows={15}
        placeholder="Escribe ecuaciones, combinaciones o ideas..."
        className="w-full p-3 border border-gray-300 rounded-lg resize-none text-sm font-math bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
};

export default NoteBox;
