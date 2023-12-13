import React from "react";

function TargetInput({ title, value, placeholder, onChange, type }) {
  return (
    <div className="flex flex-col grow">
      <span className="text-orange-400">{title}</span>
      <input
        className="w-full py-2 mr-4 text-gray-500  rounded  border-b-2 outline-none"
        type={type}
        name="value"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TargetInput;
