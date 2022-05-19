import React, { ReactElement } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import Button from '../Basic/Button/Button';
import FormValues from './Types/FormValues';
import RequiredFormFields from './Types/RequiredFormFields';
import Fields from './Types/Fields';
import DataField from './Types/Field';
import ButtonTypes from '../Basic/Button/ButtonTypes';
import BadDataException from 'Common/Types/Exception/BadDataException';

export interface ComponentProps<T extends Object> {
    id: string;
    initialValues: FormValues<T>;
    onSubmit: (values: FormValues<T>) => void;
    onValidate?: (values: FormValues<T>) => FormikErrors<FormValues<T>>;
    requiredfields: RequiredFormFields<T>;
    fields: Fields<T>;
    model: T;
    submitButtonText?: string;
    title?: string;
}

const BasicForm = <T extends Object>(
    props: ComponentProps<T>
): ReactElement => {
    const getFormField = (field: DataField<T>, index: number): ReactElement => {
        let fieldType = 'text';
        if (Object.keys(field.field).length === 0) {
            throw new BadDataException('Object cannot be without Field');
        }
        return (
            <div key={index}>
                <label>{field.title}</label>
                <p>{field.description}</p>
                <Field
                    placeholder={field.placeholder}
                    type={fieldType}
                    name={Object.keys(field.field)[0] as string}
                />
                <ErrorMessage
                    name={Object.keys(field.field)[0] as string}
                    component="div"
                />
            </div>
        );
    };

    return (
        <div>
            <Formik
                initialValues={props.initialValues}
                validate={(values: FormValues<T>) => {
                    if (props.onValidate) {
                        return props.onValidate(values);
                    }

                    return {};
                }}
                onSubmit={(values: FormValues<T>) => {
                    props.onSubmit(values);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <h1>{props.title}</h1>
                        {props.fields &&
                            props.fields.map((field: DataField<T>, i) => {
                                return getFormField(field, i);
                            })}
                        <div className="remember">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">
                                Stay signed in for a week
                            </label>
                        </div>
                        <Button
                            title={props.submitButtonText || 'Submit'}
                            disabled={isSubmitting}
                            type={ButtonTypes.Submit}
                            id={`${props.id}-submit-button`}
                        />
                        <div className="actions">
                            <p>Forgot your password?</p>
                            <p>Use single sign-on (SSO) instead</p>
                            <p>
                                <span>Don&apos;t have an account? </span> Sign
                                up
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BasicForm;