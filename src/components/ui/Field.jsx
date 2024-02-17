'use client'; // This is a client component
import React from 'react';
import classnames from 'classnames';
import { Field } from 'formik';
const InputField = (props) => {
  const {
    id,
    containerClass = '',
    labelClass = '',
    inputClass = '',
    placeholder = '',
    label = '',
    type = 'text',
    error = false,
    errorText = '',
    errorColor = 'text-red-600',
    required = false,
    ...rest
  } = props; 
  const inputClasses = classnames(
    ` w-full h-12 px-4 py-3 bg-gray-400 rounded text-base text-black font-semibold  ${
      errorText && error
        ? 'text-red-700 placeholder:text-red-600 focus:border-red-900 border-red-400  focus:border-red-400 outline-red-400 focus:outline-none border-solid focus:ring-red-200'
        : 'placeholder:text-black focus:border-none focus:outline-none outline-none '
    }   ${inputClass}`,
  );
  return (
    <div className={containerClass}>
      {label ? (
        <label
          htmlFor={id}
          className={`block mb-[5px] text-sm   font-medium text-gray-700 ${labelClass}`}
        >
          {label} {required && <span className="text-red">*</span>}
        </label>
      ) : (
        ''
      )}
      <Field type={type} className={inputClasses} id={id} placeholder={placeholder}  {...rest} />
      {errorText && error ? <p className={`my-2 text-xs ${errorColor}`}>{errorText}</p> : ''}
    </div>
  );
};

export default React.memo(InputField);
