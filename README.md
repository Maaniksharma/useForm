# useForm Hook

A custom React hook for managing form state. This hook simplifies form handling by providing an easy way to manage form fields, their values, and validation.

## Installation

To install the `useForm` hook, run:

```bash
npm install https://github.com/Maaniksharma/useForm
```

### `useForm`

The `useForm` hook manages the state of form fields.

#### Parameters

- `initialFormFields`: An array of form field objects.

#### Returns

- `formFields`: An array of form field objects with their current values.
- `getFormFieldValue`: A function to get the value by the name of field.
- `validateValue`: A function which return the boolean after validating the value with validateFunction passed before
- `changeValue`: A function which you will pass to onChange event to update the value in form fields.

### `prepareFormFields`

The `prepareFormFields` function prepares the initial form fields.

#### Parameters

- `initialFormFields`: An array of form field objects.

#### Returns

- An array of form field objects with default values.

## Usage example

```tsx
import React from "react";
import useForm, { prepareFormFields } from "@maaniksharma/useform";

const initialFormFields = prepareFormFields([
  {
    name: "username",
    initialValue: "",
    validateFunction: (value) => value.length > 0,
  },
  {
    name: "email",
    initialValue: "",
    validateFunction: (value) => /\S+@\S+\.\S+/.test(value),
  },
]);

const MyFormComponent: React.FC = () => {
  const { formFields, setFormFields, findFormIndex } =
    useForm(initialFormFields);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const index = findFormIndex(name);
    const updatedFormFields = [...formFields];
    updatedFormFields[index].value = value;
    setFormFields(updatedFormFields);
  };

  return (
    <form>
      {formFields.map((field) => (
        <div key={field.name}>
          <label>{field.name}</label>
          <input
            type="text"
            name={field.name}
            value={field.value}
            onChange={handleChange}
          />
        </div>
      ))}
    </form>
  );
};

export default MyFormComponent;
```

### Explanation

**License**: MIT

**Author**: Maaniksharma

**Repository**: (https://github.com/Maaniksharma/useform).
