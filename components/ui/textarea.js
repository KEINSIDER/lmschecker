const Textarea = ({ value, onChange }) => {
  return (
    <textarea
      className="w-1/4 h-96 p-4 border border-gray-300 rounded-lg bg-[#DBE2E9] text-black resize-none"
      value={value}
      onChange={onChange}
      placeholder="메시지를 입력하세요..."
    />
  );
};

export default Textarea;
