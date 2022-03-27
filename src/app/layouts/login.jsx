import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';
import { validator } from '../utils/validator';

export default function Login() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  function onCredsChange({ target }) {
    setCreds((prevState) => ({ ...prevState, [target.name]: target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(creds);
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения',
      },
      isEmail: {
        message: 'Email введен некорректно',
      },
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения',
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число',
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8,
      },
    },
  };

  function validate() {
    const errs = validator(creds, validatorConfig);
    setErrors(errs);
    return Object.keys(errors).length === 0;
  }

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [creds]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" name="email" value={creds.email} onChange={onCredsChange} error={errors.email} />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={creds.password}
              onChange={onCredsChange}
              error={errors.password}
            />
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
