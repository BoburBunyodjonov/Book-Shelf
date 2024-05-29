const Overlay = ({ children, show }) => {
  return (
    <div
      className={`z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default Overlay;
