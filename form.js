function formCreator(initialValues, className) {
  let values = initialValues || {};
  let touched = {};
  let erros = {};
  let validation = () => {};
  let isSubmitting = true;
  let formClassName = className || "";
  // Add Validation function for form isntance
  const setValidation = fn => (validation = fn);
  // Intialize form instance (add event listener, or set form values depend on initalize value)
  // Validate form values depend on validtion function
  const validate = () => {
    let errCheck = validation(values);
    let newErrors = {};
    Object.keys(errCheck).forEach(key => {
      if (touched[key]) {
        newErrors[key] = errCheck[key];
      }
    });
    erros = newErrors;
    if (Object.keys(erros).length > 0) {
      isSubmitting = false;
    } else {
      isSubmitting = true;
    }
    renderError();
  };
  // Handle change values in input , validate form values after change
  const handleChange = e => {
    let name = e.target.name;
    values[name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let el = document.querySelector(`.${formClassName}  [name=${name}]`);
    if (el.type === "checkbox") {
      el.checked = values[name];
    } else {
      el.value = values[name];
    }
    validate();
  };
  // handle form field you already touched use to validate
  const handleBlur = e => {
    let name = e.target.name;
    touched[name] = true;
    validate();
  };
  // Initialize form values and event listener
  const initialize = () => {
    Object.keys(values).forEach(key => {
      let el = document.querySelector(`.${formClassName}  [name=${key}]`);
      el.addEventListener("change", handleChange);
      el.addEventListener("keyup", handleChange);
      el.addEventListener("blur", handleBlur);
      el.value = values[key];
    });
  };
  // Render form values
  const rederFormValues = () => {
    Object.keys(values).forEach(key => {
      let el = document.querySelector(`.${formClassName}  [name=${key}]`);
      el.value = values[key];
    });
  };
  // Handle Form submit (when submit all field
  //will set to touched and then validate if success
  //will submit depend on function recieve)
  const handleSubmit = fn => {
    Object.keys(values).forEach(key => (touched[key] = true));
    validate();
    if (isSubmitting) {
      fn(values);
      alert(`Submit success values is
       ${JSON.stringify(values, null, 2)}`);
    } else {
      alert(`Submit failure errors is
        ${JSON.stringify(erros, null, 2)}
      `);
    }
  };
  // Render text error in html (error element have class `fieldName-error`)
  const renderError = () => {
    Object.keys(values).forEach(key => {
      let el = document.querySelector(`.${formClassName}  .${key}-error`);
      if (erros[key]) {
        el.style.display = "inline-block";
        el.textContent = erros[key];
      } else {
        el.style.display = "none";
      }
    });
  };
  // Set field value
  const setFieldValue = (name, value) => {
    values[name] = value;
    touched[name] = true;
    rederFormValues();
    validate();
  };
  // Set field touch
  const setFieldTouch = (name, isTouched, isValidate) => {
    touched[name] = isTouched;
    isValidate ? validate() : "";
  };
  return {
    initialize,
    handleSubmit,
    setValidation,
    setFieldValue,
    setFieldTouch
  };
}

// Register form 1

// Create new form instane with initialValue and class name of form
let initalValues = {
  name: "",
  email: "",
  password: "",
  isOk: false,
  car: ""
};
let exForm = formCreator(initalValues, "exForm");
exForm.initialize();
// Validate function add to form instance
const validate = values => {
  let errors = {};
  if (!values.name) {
    errors.name = "this Field is required";
  } else {
    if (values.name.length < 2) {
      errors.name = "Name must be atleast 2 characters";
    }
  }
  if (!values.email) {
    errors.email = "This Field is required";
  }
  if (!values.password) {
    errors.password = "This field is requireid";
  }
  if (!values.isOk) {
    errors.isOk = "Please Check this";
  }
  if (!values.car) {
    errors.car = "Please Select Car";
  }
  return errors;
};
exForm.setValidation(validate);
// Handle submit when click submit button
let form = document.querySelector(".exForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  exForm.handleSubmit(values => console.log(values));
});

// Register form 2

// Create new form instane with initialValue and class name of form
let initalValuesForm2 = {
  firstName: "Tuan",
  lastName: "Vo",
  fullName: "Vo Tuan",
  isBeautifulName: false
};
let anotherForm = formCreator(initalValuesForm2, "anotherForm");
anotherForm.initialize();
// Validate function add to form instance
const validateForm2 = values => {
  let errors = {};
  if (!values.firstName) {
    errors.firstName = "this Field is required";
  }
  if (!values.lastName) {
    errors.lastName = "This Field is required";
  }
  if (!values.fullName) {
    errors.fullName = "This field is requireid";
  }
  return errors;
};
anotherForm.setValidation(validateForm2);
// Handle submit when click submit button
let form2 = document.querySelector(".anotherForm");
form2.addEventListener("submit", e => {
  e.preventDefault();
  anotherForm.handleSubmit(values => console.log(values));
});
