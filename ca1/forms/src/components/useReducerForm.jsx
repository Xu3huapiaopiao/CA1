import { useState, useReducer } from "react";
import formReducer from "../formReducer";
import supabase from "../supabaseClient";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// all fields for the form
const initialState = {
    title: "",
    description: "",
    month: "12",
    day: "12",
    checkbox: ["first"],
    radio: "A",
    range: "25",
};

const Form = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    // formState if for state. dispatch is a function for calling reducer actions
    const [formState, dispatch] = useReducer(formReducer, initialState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        // important_events is the table name in supabase database
        const { error } = await supabase.from("important_events").insert([
            {
                title: formState.title,
                description: formState.description,
                date: `month:${formState.month}, day:${formState.day}`,
                checkbox: formState.checkbox,
                radio: formState.radio,
                range: formState.range,
            },
        ]);

        // if error was occured on the supabase side, we save an error
        // else return success
        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
        }

        setLoading(false);
    };

    const handleTextChange = (e) => {
        setError("");

        // title/description value cannot be empty ""
        if (e.target.value === "") {
            var field = e.target.name;
            setError(`${field} value must be required.`);
        }

        // updating state of reducer
        dispatch({
            type: "UPDATE_VALUE",
            field: e.target.name,
            payload: e.target.value,
        });
    };

    const handleDayChange = (e) => {
        setError("");

        // day validation
        if (e.target.value < 1 || e.target.value > 31) {
            setError("Day value must be between 1 and 31.");
        }

        // updating state of reducer
        dispatch({
            type: "UPDATE_VALUE",
            field: e.target.name,
            payload: e.target.value,
        });
    };

    const handleCheckboxChange = (e) => {
        // check if our checkbox value is already in reducer state
        if (formState.checkbox.includes(e.target.value)) {
            dispatch({
                type: "UPDATE_VALUE",
                field: e.target.type,
                payload: formState.checkbox.filter((x) => x !== e.target.value),
            });
        } else {
            dispatch({
                type: "UPDATE_VALUE",
                field: e.target.type,
                payload: formState.checkbox.concat(e.target.value),
            });
        }
    };

    return (
        <div className="h-screen w-full flex justify-center py-10 px-4 lg:items-center bg-black">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col h-[max-content] w-full max-w-[400px] py-4 px-6 rounded bg-white"
            >
                <div className="flex justify-center">
                    <h1 className="text-orange-700 text-xl font-bold text-center">
                        useReducer Form
                    </h1>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                    <input
                        placeholder="Title"
                        className="h-10 bg-gray-100 rounded-sm px-2"
                        value={formState.title}
                        onChange={handleTextChange}
                        name="title"
                        required
                    />
                    <textarea
                        name="description"
                        rows="3"
                        placeholder="Description"
                        value={formState.description}
                        onChange={handleTextChange}
                        className="bg-gray-100 rounded-sm px-2 py-2"
                        required
                    />
                    <div className="flex flex-wrap gap-y-3 gap-x-5">
                        <div className="flex items-center gap-2">
                            <p className="text-gray-700">Month:</p>
                            <select
                                name="month"
                                onChange={(e) =>
                                    dispatch({
                                        type: "UPDATE_VALUE",
                                        field: e.target.name,
                                        payload: e.target.value,
                                    })
                                }
                                defaultValue={formState.month}
                                className="w-[100px] h-7 bg-gray-100 rounded-sm pl-1"
                            >
                                {months.map((item, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-gray-700">Day:</p>
                            <input
                                className="h-7 w-12 bg-gray-100 rounded-sm px-2"
                                type="number"
                                defaultValue={formState.day}
                                name="day"
                                onChange={handleDayChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y">
                        <p className="text-gray-700">Select checkbox:</p>
                        <div className="flex flex-col px-1">
                            <div className="flex items-center gap-2">
                                <input
                                    value="first"
                                    type="checkbox"
                                    name="checkbox"
                                    checked={formState.checkbox.includes(
                                        "first"
                                    )}
                                    onChange={handleCheckboxChange}
                                />
                                <p>Important</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    value="second"
                                    type="checkbox"
                                    name="checkbox"
                                    checked={formState.checkbox.includes(
                                        "second"
                                    )}
                                    onChange={handleCheckboxChange}
                                />
                                <p>Least Important</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    value="third"
                                    type="checkbox"
                                    name="checkbox"
                                    checked={formState.checkbox.includes(
                                        "third"
                                    )}
                                    onChange={handleCheckboxChange}
                                />
                                <p>Not Important</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y">
                        <p className="text-gray-700">Select radio:</p>
                        <div className="flex flex-col px-1">
                            <div className="flex items-center gap-2">
                                <input
                                    value="A"
                                    type="radio"
                                    name="radio"
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_VALUE",
                                            field: e.target.name,
                                            payload: e.target.value,
                                        })
                                    }
                                    checked={formState.radio === "A"}
                                />
                                <p>A</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    value="B"
                                    type="radio"
                                    name="radio"
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_VALUE",
                                            field: e.target.name,
                                            payload: e.target.value,
                                        })
                                    }
                                    checked={formState.radio === "B"}
                                />
                                <p>B</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    value="C"
                                    type="radio"
                                    name="radio"
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_VALUE",
                                            field: e.target.name,
                                            payload: e.target.value,
                                        })
                                    }
                                    checked={formState.radio === "C"}
                                />
                                <p>C</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y">
                        <p className="text-gray-700">
                            Range:{" "}
                            <span className="font-medium">
                                {formState.range}
                            </span>
                        </p>
                        <div className="flex flex-col px-1">
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    name="range"
                                    value={formState.range}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_VALUE",
                                            field: e.target.name,
                                            payload: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {/* error section*/}
                    {error ? (
                        <div className="flex flex-col gap-y-2 bg-red-200 border-[1px] border-red-300 rounded py-2 px-3">
                            {error && <p className="text-red-700">{error}</p>}
                        </div>
                    ) : null}
                    {success ? (
                        <div className="flex flex-col gap-y-2 bg-green-200 border-[1px] border-green-300 rounded py-2 px-3">
                            <p className="font-medium text-green-700">
                                Data was successfully uploaded
                            </p>
                        </div>
                    ) : null}
                </div>
                <div className="flex mt-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-9 w-full bg-orange-800 hover:cursor-not-allowed text-white hover:bg-orange-800 rounded">
                            Loading ...
                        </div>
                    ) : (
                        <button className="h-9 w-full bg-orange-700 text-white hover:bg-orange-800 rounded">
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Form;
