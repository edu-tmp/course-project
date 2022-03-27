import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';

export default function RegisterForm() {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sexChromosomes: 'XY',
    qualities: [],
    licence: false,
  });
  const [qualities, setQualities] = useState({});
  const [professions, setProfession] = useState([]);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);
  function handleChange(target) {
    console.log(target);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }
  const validatorConfog = {
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
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию',
      },
    },
    licence: {
      isRequired: {
        message: 'Вы не можете использовать наш сервис без принятия лицензионного соглашения',
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  function validate() {
    const errors = validator(data, validatorConfog);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  const isValid = Object.keys(errors).length === 0;

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Profession"
        name="profession"
        defaultOption="Choose..."
        options={professions}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: 'XY', value: 'XY' },
          { name: 'XX', value: 'XX' },
        ]}
        value={data.sexChromosomes}
        name="sexChromosomes"
        onChange={handleChange}
        label="Sex chromosomes"
      />
      <MultiSelectField
        defaultValue={data.qualities}
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Qualities"
      />
      <CheckBoxField value={data.licence} onChange={handleChange} name="licence" error={errors.licence}>
        Accept <a>license agreement</a>
      </CheckBoxField>
      <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
}
