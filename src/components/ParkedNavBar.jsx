import { useState } from "react";
import { FaCarSide, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Map from "./Map";

function ParkedNavBar({ parks, crr, z }) {
    const parkIndex = 0;
    const date = new Date(crr.date);
    const [expanded, setExpanded] = useState(true);

    const handleLeave = () => {
        const updatedParks = parks.map((park, idx) =>
            idx === parkIndex
                ? { ...park, parked: false }
                : park
        );
        localStorage.setItem("parkingAppData", JSON.stringify(updatedParks));
        window.location.reload();
    };

    let zIndex = z ? `z-${z}` : ""

    return (
        <nav className={`fixed bottom-0 left-0 z-50 w-full
            ${zIndex}
            bg-white border-t border-gray-200
            px-4 py-3
            shadow-lg
            flex flex-col items-center gap-2
            md:hidden`}>
            <button
                className="mb-2 self-center text-gray-400 hover:text-gray-700 transition"
                onClick={() => setExpanded((prev) => !prev)}
            >
                {expanded ? <FaChevronDown size={20} /> : <FaChevronUp size={20} />}
            </button>
            <div className={`
                overflow-hidden transition-[max-height] duration-500 ease-in-out w-full
                flex flex-col gap-4 items-center p-4
                ${expanded ? 'max-h-[500px]' : 'max-h-0'}
            `}>
                <img
                    src={crr.image}
                    alt="Local estacionado"
                    className="rounded-lg object-cover w-full max-w-xs h-40 shadow-sm"
                />
                <div className="w-full max-w-xs h-40">
                    <Map location={crr.location} full={true} />
                </div>
            </div>
            <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[#00A763] text-xs font-bold">{crr.description}</span>
                    <span className="text-gray-500 text-xs">{date.toLocaleTimeString()}</span>
                </div>
                <button
                    onClick={handleLeave}
                    className="
                      flex items-center gap-2
                      bg-[#ff2d1a] text-white font-bold
                      rounded-md shadow px-4 py-2
                      hover:bg-[#9a0101] transition
                    "
                >
                    <FaCarSide size={20} />
                    Já Saí!
                </button>
            </div>
        </nav>
    );
}

export default ParkedNavBar;
