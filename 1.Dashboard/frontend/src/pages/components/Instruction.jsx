import { useEffect, useState } from 'react'
import { IoIosClose, IoIosPaper } from 'react-icons/io'
import { MdEdit } from "react-icons/md";
import { toast } from 'react-hot-toast';
import './style.css'

const Instruction = ({ formData, setFormData, portion }) => {
    const [newInstruction, setNewInstruction] = useState("");
    const [instructionTime, setInstructionTime] = useState("");
    const [isTimeDisabled, setIsTimeDisabled] = useState(false);

    useEffect(() => {
        if (portion !== 1 && formData.instructions.length > 0) {
            const firstInstruction = formData.instructions[formData.instructions.length - 1];
            setNewInstruction(firstInstruction.step);
            setIsTimeDisabled(false);
        } else {
            if (portion !== 1) setNewInstruction("");
            setIsTimeDisabled(true);
        }
    }, [portion, formData.instructions]);

    const addInstruction = (e) => {
        e.preventDefault();

        if (portion != 1 && !instructionTime) return toast.error(`Enter Instruction time for portion ${portion}`);

        if (newInstruction && instructionTime > 0) {
            if (portion === 1 && formData.instructions.length > 0) {
                const lastInstruction = formData.instructions[formData.instructions.length - 1];
                const missingPortions = lastInstruction.time.slice(1).reduce((acc, time, index) => {
                    if (time === "") {
                        acc.push(index + 2);
                    }
                    return acc;
                }, []);

                if (missingPortions.length > 0) {
                    const firstMissingPortionIndex = missingPortions[0];
                    toast.error(`Please complete adding the time for portion ${firstMissingPortionIndex} before adding a new instruction.`);
                    return;
                }
            }

            const newInstructionItem = {
                step: newInstruction,
                time: ["", "", "", "", ""],
                instruction_video_url: ""
            };
            newInstructionItem.time[portion - 1] = instructionTime;

            const existingInstructionIndex = formData.instructions.findIndex(
                (instruction) => instruction.step.toLowerCase() === newInstruction.toLowerCase()
            );

            let updatedInstructions;
            if (existingInstructionIndex !== -1) {
                updatedInstructions = formData.instructions.map((instruction, index) => {
                    if (index === existingInstructionIndex) {
                        const updatedTime = [...instruction.time];

                        const newTimeValue = Number(instructionTime);

                        const isGreaterThanOrEqualToPrevious = updatedTime.slice(0, portion - 1).every(t => t === "" || newTimeValue >= Number(t));
                        if (!isGreaterThanOrEqualToPrevious) {
                            toast.error("The current time value is less than the previous time value.");
                            return instruction;
                        }

                        const isLessThanOrEqualToNext = updatedTime.slice(portion).every(t => t === "" || newTimeValue <= Number(t));
                        if (!isLessThanOrEqualToNext) {
                            toast.error("The current time value is greater than the next time value.");
                            return instruction;
                        }

                        updatedTime[portion - 1] = instructionTime;
                        return {
                            ...instruction,
                            time: updatedTime
                        };
                    }
                    return instruction;
                });
            } else {
                updatedInstructions = [...formData.instructions, newInstructionItem];
            }

            const updatedFormData = {
                ...formData,
                instructions: updatedInstructions,
            };

            setFormData(updatedFormData);
            localStorage.setItem("formData", JSON.stringify(updatedFormData));

            setNewInstruction("");
            setInstructionTime("");
        }
    };

    const removeInstruction = (index, portionToRemove) => {
        if (portionToRemove === 1) {
            const updatedInstructions = formData.instructions.filter((_, i) => i !== index);
            setFormData({
                ...formData,
                instructions: updatedInstructions,
            });
            localStorage.setItem("formData", JSON.stringify({
                ...formData,
                instructions: updatedInstructions,
            }));
        } else {
            const updatedInstructions = formData.instructions.map((instruction, i) => {
                if (i === index) {
                    const updatedTime = [...instruction.time];
                    updatedTime[portionToRemove - 1] = "";
                    return {
                        ...instruction,
                        time: updatedTime,
                    };
                }
                return instruction;
            });
            setFormData({
                ...formData,
                instructions: updatedInstructions,
            });
            localStorage.setItem("formData", JSON.stringify({
                ...formData,
                instructions: updatedInstructions,
            }));
        }
    };

    const isTimeFilledForPortion = (portion) => {
        if (formData.instructions.length === 0) return false;
        const lastInstruction = formData.instructions[formData.instructions.length - 1];
        return lastInstruction && lastInstruction.time && lastInstruction.time[portion - 1] !== "";
    };

    return (
        <>
            <p className="custom-text text-3xl text-center pt-4 flex items-center justify-center gap-2 font-medium">
                Instructions <IoIosPaper className="text-green-600" />     <h1 className="font-semibold mt-6 md:mt-0 text-3xl text-center flex gap-2 items-center ml-3">
          <div className="group relative inline-block whitespace-nowrap">
            <span className="flex size-8 px-3 py-1 cursor-pointer items-center justify-center rounded-full bg-primary text-sm font-semibold text-green-600 bg-gray-100">
              i
            </span>

            <span
              role="tooltip"
              className="pointer-events-none absolute inline-flex items-center justify-center rounded-md px-3 py-1 font-semibold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-primary text-gray-800  bg-gray-100 min-h-7 text-sm left-1/2 -translate-x-1/2 after:absolute after:block after:size-0 after:border-8 after:border-transparent after:border-t-primary after:-bottom-[0.95rem] after:left-1/2 after:-translate-x-1/3 top-[-2.5rem] z-90 mt-1"
            >
              Please add all Instructions separately{" "}
            </span>
          </div>
        </h1>
            </p>
            <p className="custom-text-secondary text-center text-sm italic font-semibold">* Enter quantity for portion {portion}</p>
            <div className="p-1 pt-3 lg:p-8 lg:py-4">
                <div className="flex full px-4 lg:px-0">
                    {portion === 1 || !isTimeFilledForPortion(portion) ? (
                        <div className="items center w-full ">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="w-full">
                                    <label className="custom-text font-medium text-md">Enter a new Step  <span className="text-rose-600">*</span></label>
                                    <textarea
                                        disabled={portion !== 1}
                                        type="text"
                                        name="new_instruction"
                                        value={newInstruction}
                                        onChange={(e) => setNewInstruction(e.target.value)}
                                        placeholder={`Enter a new step`}
                                        className={`custom-input custom-text ${portion !== 1 ? "cursor-not-allowed" : "cursor-text"} border border-black w-full px-4 py-4 focus:border-orange-400 text-lg rounded-md placeholder:italic placeholder-text-sm outline-none focus-border-orange-400`}
                                    />
                                </div>
                                <div className="w-full lg:w-auto flex flex-col">
                                    <label className="custom-text font-medium text-md">Enter Time <span className="text-rose-600">*</span> </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            disabled={portion !== 1 && isTimeDisabled}
                                            value={instructionTime}
                                            onChange={(e) => setInstructionTime(e.target.value)}
                                            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                            type="number"
                                            placeholder="eg. 20"
                                            className={`custom-input custom-text ${portion !== 1 && isTimeDisabled ? "cursor-not-allowed" : "cursor-text"} input-number border w-full  px-2 py-4 text-lg  focus:border-orange-400 border-black rounded-md placeholder:text-gray-400 outline-none placeholder:italic`} />
                                        <p>min</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-center">
                                {portion === 1 ? (
                                    <button
                                        onClick={addInstruction}
                                        type="button"
                                        className="text-white border  bg-zinc-700 p-2 px-6 my-4 rounded-xl hover:bg-zinc-950 "
                                    >
                                        Add Instruction
                                    </button>
                                ) : portion !== 1 && !isTimeDisabled && (
                                    <button
                                        onClick={addInstruction}
                                        type="button"
                                        className="text-white border  bg-zinc-700 p-2 px-6 my-4 rounded-xl hover:bg-zinc-950 "
                                    >
                                        Add Time
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>

                {formData.instructions
                    .filter(instruction => instruction.time[portion - 1] !== "") // Filter out instructions without time
                    .map((instruction, index) => (
                        <div key={index} className="w-full">
                            <div className="items-center w-full">
                                <div className="custom-text font-medium text-md flex items-center w-full">
                                    <span className="px-4 max-w-full flex gap-2">
                                        <p>Step</p> <p>{index + 1} </p> <p> -</p>
                                    </span>
                                    <p className="flex max-w-full break-all">
                                        {instruction.step} (
                                        {instruction.time[portion - 1] ? instruction.time[portion - 1] : "N/A"} min)
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => removeInstruction(index, portion)}
                                        className="mx-2"
                                    >
                                        {portion === 1 ? (
                                            <IoIosClose className="text-rose-600 border border-rose-600 rounded-full hover:bg-rose-200 text-3xl" />
                                        ) : (
                                            <MdEdit className="text-emerald-600 rounded-full text-3xl" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Instruction