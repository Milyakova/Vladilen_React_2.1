import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQuality } from "../../hooks/useQualities";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({});
  const { professions } = useProfession();
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }));
  const { qualities } = useQuality();
  const qualityList = qualities.map((q) => ({ label: q.name, value: q._id }));

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Введите корректный email" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен включать хотя бы 1 заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен включать хотя бы 1 цифру"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: { message: "Профессия обязательна для заполнения" }
    },
    license: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  };

  useEffect(() => validate(), [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    if (!isValid) return;
    console.log(newData);
    try {
      await signUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="введите емаил"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="введите пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выбери свою профессию"
        name="profession"
        onChange={handleChange}
        value={data.profession}
        defaultOption="Choose"
        options={professionsList}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Female", value: "female" },
          { name: "male", value: "male" },
          { name: "other", value: "other" }
        ]}
        name="sex"
        onChange={handleChange}
        value={data.sex}
        label="Ваш пол"
      />
      <MultiSelectField
        options={qualityList}
        onChange={handleChange}
        name="qualities"
        label="Выберите качества"
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
