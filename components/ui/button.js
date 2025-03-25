const Button = ({ onClick, children }) => {
  return (
    <button className="mt-4 px-6 py-3 bg-[#57BBEB] text-[#051766] font-bold rounded-lg shadow-md" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
