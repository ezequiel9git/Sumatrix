const NoteBox = () => {
  return (
    <div className="w-full md:w-96">
      <label className="block mb-2 text-lg font-semibold text-gray-700">
        🧠 Tus Anotaciones
      </label>
      <textarea
        rows={15}
        placeholder="Aquí puedes escribir ecuaciones, ideas o combinaciones posibles..."
        className="w-full p-3 border rounded-md resize-none text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
};

export default NoteBox;
