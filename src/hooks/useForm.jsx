import { useState } from "react";

function useForm(initial_form_state, submitFn) {
  const [formState, setFormState] = useState(initial_form_state);

  function handleChange(e) {
    const field_name = e.target.name;
    const field_value = e.target.value;
    setFormState((prevState) => {
      return {
        ...prevState,
        [field_name]: field_value,
      };
    });
  }

  function handleSubmit (e){
    e.preventDefault()
    submitFn(formState)
  }

  return {
    formState,
    handleChange,
    handleSubmit
  }
}

export default useForm