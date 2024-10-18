# useForm Hook

A custom React hook for managing form state. This hook simplifies form handling by providing an easy way to manage form fields, their values, and validation.

## Installation

To install the `useForm` hook, run:

```bash
npm install @maaniksharma/useform
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
import FormHeader from "./FormHeader.ContactForm";
import FormField from "./FormField.ContactForm";
import { contactFormInputs } from "../../constants";
import useForm, { prepareFormFields } from "../../hooks/useForm";
import Button from "../ui/Button";

const ContactForm = () => {
  const initialFormFields = prepareFormFields(contactFormInputs);

  const { formFields, changeValue, validateValue, getFormFieldValue } =
    useForm(initialFormFields);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = formFields.every((field) => validateValue(field.name));
    if (isValid) {
      // Handle form submission
      console.log(formFields);
      console.log("Form validation success");
    } else {
      console.log(formFields);
      console.log("Form validation failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[20px] p-[16px] bg-primary-100 lg:w-[732px] items-start"
    >
      <FormHeader />
      <div className="w-full flex flex-col gap-[16px] pl-[6px] lg:pl-[10px]">
        {contactFormInputs.map((input, index) => (
          <FormField
            key={index}
            input={input}
            value={getFormFieldValue(input.name)}
            onChange={(e) => changeValue(input.name, e.target.value)}
          />
        ))}
        <div className="inline-block">
          <Button isContrast type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
```

### Explanation

**License**: MIT

**Author**: Maaniksharma

**Repository**: (https://github.com/Maaniksharma/useform).
