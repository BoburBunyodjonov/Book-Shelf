import { PropTypes } from "prop-types";

const Input = ({ label, ...rest }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={rest.id}
        className="block text-gray-700 text-sm font-bold"
      >
        {label}
      </label>
      <input
        {...rest}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default Input;

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
