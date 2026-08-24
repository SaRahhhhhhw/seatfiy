const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  signin: 'btn-signin',
};

function Button({ children, variant = 'primary', icon, fullWidth = false, className = '', ...rest }) {
  const variantClass = VARIANT_CLASS[variant] || VARIANT_CLASS.primary;

  return (
    <button className={`${variantClass} ${fullWidth ? 'btn-full' : ''} ${className}`} {...rest}>
      {icon}
      {children}
    </button>
  );
}

export default Button;
