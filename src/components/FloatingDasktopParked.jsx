import { FaCarSide } from "react-icons/fa";
import Map from "./Map";

const LOCAL_STORAGE_KEY = "parkingAppData";

function FloatingDasktopParked({ parks, crr }) {

    const parkIndex = 0;
    const date = new Date(crr.date)

    const handleLeave = () => {
        const updatedParks = parks.map((park, idx) =>
            idx === parkIndex
                ? { ...park, parked: false }
                : park
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedParks));
        window.location.reload()

    };

    return (
        <div className="
            bg-white shadow-md rounded-lg p-6 border-l-4 border-[#00A763] max-w-md mx-auto my-4
            "
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#00A763]">Estacionado</h2>
            </div>
            <div className="flex flex-col gap-2">
                {
                    <div className="
                        flex items-center
                        text-gray-950 px-2 py-2 rounded
                        hover:bg-[#00A763]/10 transition
                        "
                    >
                        <span className="text-[#00A763] font-semibold">{crr.description}</span>
                        <span className="ml-auto text-gray-500 text-xs">{date.toLocaleString()}</span>
                    </div>
                }
            </div>
            <div className="flex flex-col gap-4 items-center p-4">
                <img
                    src={crr.image}
                    alt="Local estacionado"
                    className="rounded-lg object-cover w-full max-w-xs h-40 shadow-sm"
                />
                <div className="w-full max-w-xs h-40">
                    <Map location={crr.location} full={true} />
                </div>
            </div>

            <button
                className="
                flex justify-center items-center gap-3.5
                mt-4 w-full py-2 px-4
                bg-[#ff2d1a] text-white font-bold
                rounded-md shadow hover:bg-[#9a0101] transition
                focus:outline-none focus:ring-2 focus:ring-[#ff2d1a]/50
                "
                onClick={handleLeave}
            >
                <FaCarSide size={20} />
                Já Saí!
            </button>
        </div>


    )
}

export default FloatingDasktopParked;