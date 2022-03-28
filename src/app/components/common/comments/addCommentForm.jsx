import React, { useEffect, useState } from 'react';
import API from '../../../api';
import SelectField from '../form/selectField';
import TextAreaField from '../form/textAreaField';
import { validator } from '../../../utils/validator';
import PropTypes from 'prop-types';

const initialData = { userId: '', content: '' };

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default function AddCommentForm({ onSubmit }) {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});
  function handleChange(target) {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }
  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Выберите от чьего имени вы хотите отправить сообщение',
      },
    },
    content: {
      isRequired: {
        message: 'Сообщение не может быть пустым',
      },
    },
  };

  function validate() {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  useEffect(() => {
    API.users.fetchAll().then(setUsers);
  }, []);
  function clearForm() {
    setData(initialData);
    setErrors({});
  }
  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  }
  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      name: users[userId].name,
      value: users[userId]._id,
    }));
  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          onChange={handleChange}
          options={arrayOfUsers}
          name="userId"
          value={data.userId}
          defaultOption="Choose user"
          error={errors.userId}
        />
        <TextAreaField
          value={data.content}
          onChange={handleChange}
          name="content"
          label="Message"
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Publish</button>
        </div>
      </form>
    </div>
  );
}
