const InputField = ({
  containerMargin = "mb-4",
  id,
  type = "text",
  ...props
}) => {
  const formatLabel = id => {
    return id.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase());
  };
  return (
    <div className={containerMargin}>
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {formatLabel(id)}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="border rounded w-full py-2 px-3"
        required
        {...props}
      />
    </div>
  );
};

export default InputField;
