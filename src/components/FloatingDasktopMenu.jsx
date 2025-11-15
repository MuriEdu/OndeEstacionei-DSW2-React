import { FaHistory, FaRegMap } from "react-icons/fa";
import { useNavigate } from "react-router";

function FloatingDasktopMenu({ threeLeastParks, location }) {

    const navigate = useNavigate()

    return (
        <div className="
            bg-white shadow-md rounded-lg p-6 border-l-4 border-[#00A763] max-w-md mx-auto my-4
            "
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#00A763]">Histórico Recente</h2>
                <button
                    className="
                    py-2 px-4 ml-2
                    bg-[#00A763] text-white font-semibold
                    rounded-md shadow hover:bg-[#009455] transition
                    focus:outline-none focus:ring-2 focus:ring-[#00A763]/40
                     "
                    onClick={() => {navigate("history")}}
                >
                    <FaHistory size={20} />
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {
                    threeLeastParks.length > 0 ?
                        threeLeastParks.map((entry, idx) => {
                            const date = new Date(entry.date)
                            return (
                                <div key={idx} className="
                                    flex items-center
                                    text-gray-950 px-2 py-2 rounded
                                    hover:bg-[#00A763]/10 transition
                                    "
                                >
                                    <span className="text-[#00A763] font-semibold">{entry.description}</span>
                                    <span className="ml-auto text-gray-500 text-xs">{date.toLocaleString()}</span>
                                </div>
                            )
                        }) :
                        <p className="text-gray-400">Não há estacionamentos recentes...</p>
                }
            </div>
            <button
                className="
                flex justify-center items-center gap-3.5
                mt-4 w-full py-2 px-4
                bg-[#00A763] text-white font-bold
                rounded-md shadow hover:bg-[#009455] transition
                focus:outline-none focus:ring-2 focus:ring-[#00A763]/50
                "
                onClick={() => {
                    navigate(`park?latitude=${location.latitude}&longitude=${location.longitude}`)
                }}
            >
                <FaRegMap size={20} />
                Estacionar
            </button>
        </div>


    )
}

export default FloatingDasktopMenu;