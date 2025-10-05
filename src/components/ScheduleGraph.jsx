import { useState, useRef } from 'react';

export default function ScheduleGraph({ canEdit, className, availabilityMatrix, setAvailabilityMatrix }) {
    const mousePopup = useRef(null);
    const mainDiv = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    function toggleCell(row, col) {
        setAvailabilityMatrix(prev => {
            const newMatrix = prev.map(r => [...r]);
            newMatrix[row][col] = newMatrix[row][col] === 1 ? 0 : 1;
            return newMatrix;
        });
    }

    return (
        <div ref={mainDiv} class={`${className} flex justify-center m-auto h-fit w-fit bg-darker-gray`}>
            <p
            ref={mousePopup}
            inert
            className={`${
            isOpen ? "" : "invisible"
            } fixed w-15 h-4 text-xs opacity-75 text-black text-center flex items-center justify-center bg-white rounded-sm`}
            >            
            </p>

            <table class="w-fit" onMouseEnter={(e)=>{
                setIsOpen(true);
            }} onMouseLeave={(e)=>{
                setIsOpen(false);
            }} onMouseMove={(e)=>{
                if (!canEdit) {
                    const rect = mainDiv.current.getBoundingClientRect();
                    mousePopup.current.style.left = `${e.clientX - rect.left + 5}px`;
                    mousePopup.current.style.top = `${e.clientY - rect.top - 10}px`;
                } else {
                    mousePopup.current.style.left = `${e.clientX + 5}px`;
                    mousePopup.current.style.top = `${e.clientY - 10}px`;
                }
            }}>
                <tr class="select-none border-1 border-white text-white text-center">
                    <td class="border-1 border-white">Mon</td>
                    <td class="border-1 border-white">Tue</td>
                    <td class="border-1 border-white">Wed</td>
                    <td class="border-1 border-white">Thu</td>
                    <td class="border-1 border-white">Fri</td>
                    <td class="border-1 border-white">Sat</td>
                    <td class="border-1 border-white">Sun</td>
                </tr>
                {
                    availabilityMatrix.map((row,rowIndex) => {
                        const hour = Math.floor(rowIndex/2);
                        const minutes = rowIndex % 2 === 0 ? "00" : "30";
                        const timeLabel = `${hour.toString().padStart(2,'0')}:${minutes}`;
                        return (
                            
                            <tr key={rowIndex} class={`border-l-0 border-r-0 border-${minutes == "00" ? 'darker-gray' : 'light-gray'} border-b-1 h-3`}>
                                {
                                    row.map((cell, colIndex) => {
                                        return (
                                        <td style={{backgroundColor: availabilityMatrix[rowIndex][colIndex] === 1 ? "#f95959" : "transparent"}} onMouseOver={(e)=>{
                                            if (canEdit) {
                                                mousePopup.current.innerText = timeLabel;
                                                if (e.buttons == 1) {
                                                    if (availabilityMatrix[rowIndex][colIndex] == 0) {
                                                        e.target.style.backgroundColor = "#f95959";
                                                    } else {
                                                        e.target.style.backgroundColor = "transparent";
                                                    }
                                                    toggleCell(rowIndex,colIndex);
                                                }
                                            }
                                        }} onMouseDown={(e)=>{
                                            if (canEdit) {
                                                if (availabilityMatrix[rowIndex][colIndex] == 0) {
                                                    e.target.style.backgroundColor = "#f95959";
                                                } else {
                                                    e.target.style.backgroundColor = "transparent";
                                                }
                                                toggleCell(rowIndex,colIndex);
                                            }
                                        }} class="w-10 select-none border-r-1 border-l-1 border-white" key={colIndex}>
                                        </td>
                                        )
                                    })
                                }

                            </tr>
                            
                        )
                    })
                }
            </table>
        </div>
    )
}