import { Field } from "react-final-form";

export const MeetingField = ({ name, label, inputProps, right }) => {
  return (
    <Field
      style={{ width: "20rem", marginLeft: "10px" }}
      className="form-control form-control-sg"
      {...{ name }}
    >
      {({ input, meta }) => (
        <div>
          <div className="d-flex form-outline mb-4">
            <label className="form-label mt-1" style={{ width: "6rem" }}>
              {label}
            </label>
            <input {...input} {...inputProps} className="flex-grow-1" />
            {right ? right : <noscript />}
          </div>
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
      )}
    </Field>
  );
};
