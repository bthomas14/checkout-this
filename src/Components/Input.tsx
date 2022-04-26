/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react';
import React from 'react';

import {StyledError} from './ReviewForm';

interface InputProps {
  error?: string[];
  name: string;
  value: string;
  onChange: (_evt: any) => void;
  placeholder?: string;
  label?: string;
  validation?: () => void;
  type?: string;
  width?: string;
}

const Input: React.FunctionComponent<InputProps> = (props) => {
  const {error, name, value, onChange, placeholder, label, type = 'text', width = '100%'} = props;

  return (
    <div css={{marginBottom: '20px'}}>
      {label && (
        <label htmlFor={name} css={{display: 'block', marginBottom: '5px'}}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        aria-label={label}
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
        placeholder={placeholder}
        css={{
          height: '30px',
          width: width,
          border: '1px solid',
          borderColor: error ? 'red' : '#cecfd9',
          borderRadius: '4px',
          padding: '8px 10px',
          fontFamily: 'Graphik, Helvetica, sans-serif',
          fontWeight: 300,
          fontSize: '1rem',
          backgroundColor: '#fff',
        }}
      />
      {error && <StyledError>{error.join(', ')}</StyledError>}
    </div>
  );
};

export default Input;
