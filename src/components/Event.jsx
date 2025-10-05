export default function Event({ event, session, onInterest }) {
    return (
        <div class="cursor-pointer transition-all rounded-lg m-2 bg-darker-gray p-2 min-w-100 max-w-100 shadow-md hover:shadow-lg hover:scale-105" key={event.id}>
            <h2 class="text-white font-roboto text-xl truncate">{event.title}</h2>
            <p class="text-white font-roboto text-base truncate">{event.description}</p>
            <p class="text-white">
                {event.o ? (
                    <img className="transition-color relative z-3 border-2 rounded-full align-middle mr-1.5 w-6 h-6 group-hover:border-black"
                    src={img}
                    onError={(e)=>{
                        e.target.src=profile;
                        e.target.classList.add("fill-white");
                    }}
                    ></img>
                ) : null}
                {event.organizerName}
            </p>
            <p class="text-white">Location: {event.location}</p>
            
            <p class="text-white">Time {event.date_and_time ? <>: {event.date_and_time} </>:<>- Estimated: {event.windowSize * 15} </>}</p>
            
            <p class="text-white">People Interested: {event.interested?.length || 0}</p>
            <button class="text-white" onClick={() => onInterest(event.id)}>
                {event.interested?.includes(session.user.id) ? "Not Interested" : "I'm Interested"}
            </button>
            <br />
            <br />
        </div>
    )
}