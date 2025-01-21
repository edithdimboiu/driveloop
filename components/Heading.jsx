const Heading = ({ text, extraClassName = "" }) => {
  return (
    <h2 className={`text-2xl font-bold text-gray-800 ${extraClassName}`}>
      {text}
    </h2>
  );
};

export default Heading;
