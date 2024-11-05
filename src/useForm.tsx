import { useState } from "react";

interface FormField {
  name: string;
  validateFunction?: (value: any) => boolean;
  value?: any;
}

export function prepareFormFields(initialFormFields: any[]) {
  return initialFormFields.map((input) => ({
    name: input.name,
    value: input.initialValue || "",
    validateFunction: input.validateFunction,
  }));
}

const useForm = (initialFormFields: FormField[]) => {
  const [formFields, setFormFields] = useState<FormField[]>(initialFormFields);

  function findFormIndex(name: string) {
    const formFieldIndex = formFields.findIndex(
      (formField) => formField.name === name
    );
    return formFieldIndex;
  }

  function validateValue(name: string): boolean {
    console.log(name);
    const formFieldIndex = findFormIndex(name);

    if (formFieldIndex != -1) {
      const formField = formFields[formFieldIndex];
      console.log(formField);
      if (formField.validateFunction) {
        return formField.validateFunction(formField.value);
      }
    }
    return false;
  }

  function changeValue(name: string, newValue: any): void {
    const formFieldIndex = findFormIndex(name);
    if (formFieldIndex != -1) {
      const updatedFormFields = [...formFields];
      updatedFormFields[formFieldIndex].value = newValue;
      setFormFields(updatedFormFields);
    }
  }

  function getFormFieldValue(name: string): undefined | any {
    const formFieldIndex = findFormIndex(name);
    if (formFieldIndex != -1) {
      return formFields[formFieldIndex].value;
    }
    return undefined;
  }

  return { formFields, getFormFieldValue, validateValue, changeValue };
};

export default useForm;
