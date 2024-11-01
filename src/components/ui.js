import React from 'react';

export const Input = ({ ...props }) => <input {...props} className="w-full p-2 border rounded" />;

export const Button = ({ children, ...props }) => (
  <button {...props} className="w-full p-2 bg-blue-500 text-white rounded">
    {children}
  </button>
);

export const Select = ({ children, ...props }) => (
  <select {...props} className="w-full p-2 border rounded">
    {children}
  </select>
);

Select.Option = ({ children, ...props }) => <option {...props}>{children}</option>;

export const Card = ({ children, ...props }) => (
  <div {...props} className="bg-white shadow rounded p-4">
    {children}
  </div>
);

export const Switch = ({ checked, onCheckedChange }) => (
  <label className="flex items-center cursor-pointer">
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={checked} onChange={() => onCheckedChange(!checked)} />
      <div className={`block w-14 h-8 rounded-full ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${checked ? 'transform translate-x-6' : ''}`}></div>
    </div>
  </label>
);