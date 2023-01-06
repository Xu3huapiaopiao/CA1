import { useForm } from "react-hook-form";
import { useState } from "react";

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

const Form = () => {
    // initialize useForm hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            checkbox: ["first"],
            radio: "Cw"
        },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [rangeValue, setRangeValue] = useState(25);

    const onSubmit = async (formData) => {
        setLoading(true);
        setSuccess(false);
        setError("");

        // important_events is the table name in supabase
        // we put all data that is stored into useForm hook
        const { error } = await supabase
            .from("important_events")
            .insert([
                {
                    title: formData.title,
                    description: formData.description,
                    date: `month:${formData.month}, day:${formData.day}`,
                    checkbox: formData.checkbox,
                    radio: formData.radio,
                    range: formData.range,
                },
            ]);

        // if error was occured on the supabase side, we save an error
        // else return success
        if (error) {
            setError(error.message);
        } else {
            setSuccess(true)
        }

        setLoading(false);
    };

    return (
        <div className="h-screen w-full flex justify-center py-10 px-4 lg:items-center bg-black">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col h-[max-content] w-full max-w-[400px] py-4 px-6 rounded bg-white"
            >
                <div className="flex justify-center">
                    <h1 className="text-green-700 text-xl font-bold text-center">
                        React Hook Form
                    </h1>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                    <input
                        placeholder="Title"
                        className="h-10 bg-gray-100 rounded-sm px-2"
                        {...register("title", {
                            required: "is required.",
                        })}
                    />
                    <textarea
                        {...register("description", {
                            required: "is required.",
                        })}
                        rows="3"
                        placeholder="Description"
                        className="bg-gray-100 rounded-sm px-2 py-2"
                    />
                    <div className="flex flex-wrap gap-y-3 gap-x-5">
                        <div className="flex items-center gap-2">
                            <p className="text-gray-700">Month:</p>
                            <select
                                {...register("month")}
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
                                defaultValue={1}
                                {...register("day", {
                                    required: true,
                                    min: 1,
                                    max: 31,
                                })}
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
                                    {...register("checkbox")}
                                />
                                <p>Important</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    value="second"
                                    type="checkbox"
                                    {...register("checkbox")}
                                />
                                <p>Least Important</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    value="third"
                                    type="checkbox"
                                    {...register("checkbox")}
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
                                    {...register("radio")}
                                />
                                <p>A</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    value="B"
                                    type="radio"
                                    {...register("radio")}
                                />
                                <p>B</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    value="C"
                                    type="radio"
                                    {...register("radio")}
                                />
                                <p>C</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y">
                        <p className="text-gray-700">Range: <span className="font-medium">{rangeValue}</span></p>
                        <div className="flex flex-col px-1">
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    {...register("range")}
                                    value={rangeValue}
                                    onChange={(e) => setRangeValue(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    {/* errors section */}
                    {errors.title ||
                    errors.description ||
                    errors.day ||
                    error ? (
                        <div className="flex flex-col gap-y-2 bg-red-200 border-[1px] border-red-300 rounded py-2 px-3">
                            {errors.title && (
                                <p className="text-red-700">
                                    <span className="font-medium">Title </span>
                                    {errors.title?.message}
                                </p>
                            )}
                            {errors.description && (
                                <p className="text-red-700">
                                    <span className="font-medium">
                                        Description{" "}
                                    </span>
                                    {errors.description?.message}
                                </p>
                            )}
                            {errors.day && (
                                <p className="text-red-700">
                                    <span className="font-medium">
                                        Day value{" "}
                                    </span>
                                    {"must be between 1 and 31."}
                                </p>
                            )}
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
                        <div className="flex justify-center items-center h-9 w-full bg-green-800 hover:cursor-not-allowed text-white hover:bg-green-800 rounded">
                            Loading ...
                        </div>
                    ) : (
                        <button className="h-9 w-full bg-green-700 text-white hover:bg-green-800 rounded">
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Form;
