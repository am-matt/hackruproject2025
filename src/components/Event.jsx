import profile from '../assets/profile.svg'
import location from '../assets/location.png'
import people from '../assets/people.png'
import time from '../assets/time.png'

export default function Event({ event, session, onInterest }) {
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
        <div class="transition-all rounded-lg m-2 bg-darker-gray p-2 min-w-100 max-w-100 max-h-40 shadow-md hover:shadow-lg hover:scale-105" key={event.id}>
            <h2 class="text-white font-roboto text-xl truncate">{event.title}</h2>
            <p class="text-white font-roboto text-base truncate">{event.description}</p>
            <div class="flex mb-1">
                <p class="text-white flex items-center text-sm mr-2">
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
                <p class="text-white flex items-center text-sm truncate">
                    <img className="transition-color relative z-3 rounded-full align-middle mr-1.5 w-3.5 h-3.5 group-hover:border-black"
                    src={location}></img>
                    {event.location}
                </p>
            </div>

            <div class="flex mb-1">
                <p class="text-white flex items-center text-sm mr-2">
                    <img className="transition-color relative z-3 rounded-full align-middle mr-1.25 mt-0.5 w-3.5 h-3.5 group-hover:border-black"
                    src={people}></img>
                    {event.interested?.length || 0}
                </p>
                {console.log(new Date(event.date_and_time))}
                <p class="text-white flex items-center text-sm mr-2">
                    
                    <img className="transition-color relative z-3 rounded-full align-middle mr-1.25 mt-0.5 w-3.5 h-3.5 group-hover:border-black"
                    src={time}></img>
                    {event.date_and_time ? <>{formatDate(event.date_and_time,event.windowSize*15)}
                    </>:<>Est. {event.windowSize * 15} min </>}
                </p>
            </div>
            
            
            <button class="mt-1 cursor-pointer text-white text-base rounded-lg p-1 bg-dark-gray active:bg-light-gray" onClick={() => onInterest(event.id)}>
                {event.interested?.includes(session.user.id) ? "Not Interested" : "I'm Interested"}
            </button>
            <br />
            <br />
        </div>
    )
}