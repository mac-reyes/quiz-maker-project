import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return <select {...props}>{children}</select>;
};

export default Select;
