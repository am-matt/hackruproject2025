import profile from '../assets/profile.svg'

export default function NavButton({ text, className, img, onclick, refA }) {
    return (
        <div ref={refA} className={className}>
            <button onClick={onclick} className="select-none flex group relative overflow-hidden p-2 bg-top-left h-full mr-2 ml-2 text-white group-hover:text-dark-gray font-semibold font-roboto cursor-pointer">
                {img ? (
                    <img className="transition-color relative z-3 border-2 rounded-full align-middle mr-1.5 w-6 h-6 group-hover:border-black"
                    src={img}
                    onError={(e)=>{
                        e.target.src=profile;
                        e.target.classList.add("fill-white");
                    }}
                    ></img>
                ) : null}
                <span ref={refA} className="select-none transition-color relative z-2 text-white group-hover:text-dark-gray">{text}</span>
                <span className="select-none inset-shadow-innerbox scale-y-0 transition-transform absolute inset-0 bg-white origin-bottom  group-hover:scale-y-100"></span>
            </button>
        </div>
    );
}