import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enterNameInputTouch, setEnterNameInputTouch] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const inputNameValid = !enteredNameIsValid && enterNameInputTouch;

  let formIsValid = false;
  if (enteredNameIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value)
  }

  const nameInputBlurHandler = event => {
    setEnterNameInputTouch(true);
  }

  const formSubmissionHandler = event => {
    event.preventDefault();
    setEnterNameInputTouch(true);
    if (!enteredNameIsValid) {
      return;
    }
    // console.log(enteredName);
    setEnteredName("");
    setEnterNameInputTouch(false);
  }


  const nameInputClasses = inputNameValid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          value={enteredName}
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
      </div>
      {inputNameValid && <p className="error-text">Name must not be empty</p>}
      <div className="form-actions">
        <button disabled={!formIsValid} type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
