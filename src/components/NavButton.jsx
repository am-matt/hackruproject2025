import profile from '../assets/profile.svg'

export default function NavButton({ text, className, img }) {
    return (
        <div class={className}>
            <button class="flex group relative overflow-hidden p-2 bg-top-left h-full mr-2 ml-2 text-white group-hover:text-dark-gray font-semibold font-roboto cursor-pointer">
                {img ? (
                    <img class="transition-color relative z-3 border-2 rounded-full align-middle mr-1.5 w-6 h-6 group-hover:border-black"
                    src={img}
                    onError={(e)=>{
                        e.target.src=profile;
                        e.target.classList.add("fill-white");
                    }}
                    ></img>
                ) : null}
                <span className="transition-color relative z-2 text-white group-hover:text-dark-gray">{text}</span>
                <span className="inset-shadow-innerbox scale-y-0 transition-transform absolute inset-0 bg-white origin-bottom  group-hover:scale-y-100"></span>
            </button>
        </div>
    );
}