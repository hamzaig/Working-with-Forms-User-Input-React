import { useReducer } from "react";


const defaultState = {
    enteredValue: "",
    isTouched: false,
};
const inputReducer = (state, action) => {
    if (action.type === "VALUE") {
        return {
            enteredValue: action.value,
            isTouched: state.isTouched,
        }
    } else if (action.type === "BLUR") {
        return {
            enteredValue: state.enteredValue,
            isTouched: true,
        }
    } else if (action.type === "RESET") {
        return {
            enteredValue: "",
            isTouched: state.isTouched,
        }
    }
    return defaultState;
};

const useInput = (validateValue) => {
    const [inputState, dispatchInputState] = useReducer(inputReducer, defaultState);

    // const [enteredValue, setEnteredValue] = useState("");
    // const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(inputState.enteredValue);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (e) => {
        e.preventDefault();
        dispatchInputState({ type: "VALUE", value: e.target.value });
    }

    const inputBlurHandler = () => {
        dispatchInputState({ type: "BLUR" });
    }

    const reset = () => {
        dispatchInputState({ type: "RESET" });
    }

    return {
        value: inputState.enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    }
}

export default useInput;