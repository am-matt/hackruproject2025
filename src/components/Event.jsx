import { useState, useRef } from 'react';
import ScheduleGraph from './ScheduleGraph';
import profile from '../assets/profile.svg'
import location from '../assets/location.png'
import people from '../assets/people.png'
import time from '../assets/time.png'

export default function Event({ event, session, onInterest, deleteEvent }) {
    const [isOpen, setIsOpen] = useState(false);

    const [availabilityMatrix, setAvailabilityMatrix] = useState(
        Array.from({ length: 48 }, () => Array(7).fill(0))
    );

    function formatDate(data,minutes) {
        const date = new Date((new Date(data)).toLocaleString('en-US', {timeZone:'America/New_York'}));
        const pad = (num) => num.toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

        const laterDate = new Date(date.getTime() + minutes* 60 * 1000);

        const ogDateFormat = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())} ${ampm}`;
        const laterDateFormat = `${laterDate.getMonth()+1}/${laterDate.getDate()}/${laterDate.getFullYear()} ${pad(laterDate.getHours())}:${pad(laterDate.getMinutes())} ${ampm}`;
        return `${ogDateFormat} - ${laterDateFormat}`;
    }

    return (
        <div onMouseDown={()=>{
            setIsOpen(false);
        }} class={`${isOpen ? "fixed z-10 top-0 left-0 w-[100%] h-[100%] bg-semiblack" : ""}`}>
        <div onMouseDown={(e)=>{
            e.stopPropagation();
            setIsOpen(true);
        }} className={`${isOpen ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] z-200 cursor-initial" : "min-w-100 max-w-100 max-h-30 hover:scale-105 cursor-pointer"} transition-all rounded-lg m-2 bg-darker-gray p-2 shadow-md hover:shadow-lg `} key={event.id}>
            {
                (isOpen ?
                    <p onMouseUp={(e)=>{
                        setIsOpen(false)
                    }} class="absolute right-5 top-5 rounded-full pt-2 pb-2 pl-4 pr-4 cursor-pointer bg-semiblack text-2xl text-white">X</p>
                    :
                    null
                )
            }

            <h2 className="text-white font-roboto text-xl truncate">{event.title}</h2>
            <p className="text-white font-roboto text-base truncate">{event.description}</p>
            <div className="flex mb-1">
                {
                    session ?
                    <p className="text-white flex items-center text-sm mr-2">
                        {event.organizerAvatar ? (
                            <img className="transition-color relative z-3 bg-white rounded-full align-middle mr-1.5 w-5 h-5 group-hover:border-black"
                            src={event.organizerAvatar}
                            onError={(e)=>{
                                e.target.src=profile;
                                e.target.classList.add("fill-white");
                            }}
                            ></img>
                        ) : null}
                        {event.organizerName}
                    </p>
                    : null
                }
                <p className="text-white flex items-center text-sm truncate">
                    <img className="transition-color relative z-3 rounded-full align-middle mr-1.5 w-3.5 h-3.5 group-hover:border-black"
                    src={location}></img>
                    {event.location}
                </p>
            </div>

            <div className="flex mb-1">
                <p className="text-white flex items-center text-sm mr-2">
                    <img className="transition-color relative z-3 rounded-full align-middle mr-1.25 mt-0.5 w-3.5 h-3.5 group-hover:border-black"
                    src={people}></img>
                    {event.interested?.length || 0}
                </p>
                <p className="text-white flex items-center text-sm mr-2">
                    
                    <img className="transition-color relative z-3 rounded-full align-middle mr-1.25 mt-0.5 w-3.5 h-3.5 group-hover:border-black"
                    src={time}></img>
                    {event.date_and_time ? <>{formatDate(event.date_and_time,event.windowSize*15)}
                    </>:<>Est. {event.windowSize * 15} min </>}
                </p>
            </div>
            
            {
                (session && isOpen ?
                    <button className="mt-1 cursor-pointer text-white text-base rounded-lg p-1 bg-dark-gray active:bg-light-gray" onClick={() => onInterest(event.id)}>
                        {event.interested?.includes(session.user.id) ? "Not Interested" : "I'm Interested"}
                    </button>
                    :
                    null
                )
            }
            {
                (deleteEvent && isOpen?
                    <button className="mt-1 cursor-pointer text-white text-base rounded-lg p-1 bg-dark-gray active:bg-light-gray" onClick={deleteEvent}>
                        Delete Event
                    </button>
                    : null
                )
            }

            {
                (isOpen ?
                    <ScheduleGraph className="absolute origin-top-left scale-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" availabilityMatrix={availabilityMatrix} setAvailabilityMatrix={setAvailabilityMatrix} />
                : null)
            }
            
            
            <br />
            <br />
            
        </div>
        </div>
    )
}