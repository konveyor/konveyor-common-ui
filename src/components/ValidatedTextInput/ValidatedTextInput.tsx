import * as React from 'react';
import {
  FormGroup,
  FormGroupProps,
  TextArea,
  TextAreaProps,
  TextInput,
  TextInputProps,
} from '@patternfly/react-core';
import {
  IValidatedFormField,
  getFormGroupProps,
  getTextAreaProps,
  getTextInputProps,
} from '../../hooks/useFormState';

interface IValidatedTextInputProps
  extends Pick<FormGroupProps, 'label' | 'fieldId' | 'isRequired'>,
    Pick<TextInputProps, 'type'> {
  /** A field returned from useFormField() or useFormState().fields.* */
  field: IValidatedFormField<string> | IValidatedFormField<string | undefined>;
  /** Either a TextInput or TextArea from @patternfly/react-core. Defaults to TextInput */
  component?: typeof TextInput | typeof TextArea;
  /** Any extra props for the PatternFly FormGroup */
  formGroupProps?: Partial<FormGroupProps>;
  /** Any extra props for the PatternFly TextInput or TextArea */
  inputProps?: Partial<TextInputProps> | Partial<TextAreaProps>;
}

export const ValidatedTextInput: React.FunctionComponent<IValidatedTextInputProps> = ({
  field,
  component = TextInput,
  label,
  fieldId,
  isRequired,
  type = 'text',
  formGroupProps = {},
  inputProps = {},
}: IValidatedTextInputProps) => (
  <FormGroup
    label={label}
    isRequired={isRequired}
    fieldId={fieldId}
    {...getFormGroupProps(field as IValidatedFormField<string | undefined>)}
    {...formGroupProps}
  >
    {component === TextInput ? (
      <TextInput
        id={fieldId}
        type={type}
        {...getTextInputProps(field)}
        {...(inputProps as Partial<TextInputProps>)}
      />
    ) : (
      <TextArea
        id={fieldId}
        {...getTextAreaProps(field)}
        {...(inputProps as Partial<TextAreaProps>)}
        ref={null} // Necessary because of some weird TS issue with spreading Partial<TextAreaProps>['ref']
      />
    )}
  </FormGroup>
);
