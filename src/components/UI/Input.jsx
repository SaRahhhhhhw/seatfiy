function Input({ label, icon, ...rest }) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <div className="input-field">
        {icon}
        <input {...rest} />
      </div>
    </div>
  );
}

export default Input;
