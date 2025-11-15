import { useEffect, useState } from "react";
import { FaParking } from "react-icons/fa";
import { useNavigate } from "react-router";
import Logo from "../../assets/logo.png";

const LOCAL_STORAGE_KEY = "parkingAppData";

function MobileHistory() {

    const navigate = useNavigate()

    const getHistory = () => {
        const localHistory = localStorage.getItem(LOCAL_STORAGE_KEY)
        setHistory(localHistory ? JSON.parse(localHistory) : [])
    }

    const [history, setHistory] = useState([])

    useEffect(() => {
        getHistory()
    }, [])

    return (
        <div className="w-screen h-full bg-gray-200 flex flex-col gap-8">
            <header className="fixed w-screen h-fit flex flex-col gap-8 justify-center items-center p-8 bg-gray-100 top-0 z-10000 rounded-b-3xl ">
                <img src={Logo} />
                <h2 className="text-xl text-gray-600 font-bold flex justify-center items-center">Histórico de Estacionamentos</h2>
            </header>

            <div className="flex flex-col gap-2 pt-45 pb-32">
                {history.length > 0 ? (
                    <ul className="flex flex-col gap-4 px-4 pb-24">
                        {history.map((entry, idx) => {
                            const date = new Date(entry.date);
                            return (
                                <li
                                    key={idx}
                                    className="
                                    flex items-center justify-between gap-4
                                    bg-white rounded-xl shadow-md
                                    px-6 py-4
                                    border border-gray-100
                                    hover:scale-[1.01] hover:shadow-lg hover:bg-[#f8fafc]
                                    transition
                                    "
                                >
                                    {/* Image on the left */}
                                    {entry.image ? (
                                        <img
                                            src={entry.image}
                                            alt="Histórico"
                                            className="w-14 h-14 object-cover rounded-lg border border-gray-200 bg-gray-100"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-300 text-xl">
                                            ?
                                        </div>
                                    )}
                                    {/* Main details */}
                                    <div className="flex-1 min-w-0 flex flex-col ml-3">
                                        <span className="text-lg font-semibold text-[#00A763] truncate">
                                            {entry.description}
                                        </span>
                                        <span className="text-xs text-gray-500 font-medium mt-1 truncate">
                                            {date.toLocaleString()}
                                        </span>
                                    </div>
                                    {/* Status/index pill */}
                                    <span className="rounded-full bg-[#00A763]/10 text-[#00A763] px-2 py-1 text-sm font-bold border border-[#00A763]/20">
                                        #{history.length - idx}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center mt-24">
                        <FaParking className="w-16 h-16 mb-4 text-gray-300" />
                        <p className="text-gray-400 text-lg">Não há estacionamentos recentes...</p>
                    </div>
                )}
            </div>

            <nav className="fixed w-screen h-fit bottom-0 z-1000 flex flex-row justify-center items-center gap-4 p-8 rounded-t-2xl bg-gray-200">
                <button
                    className="
                    text-4xl
                    flex justify-center items-center gap-3.5
                    w-full py-2 px-4
                    bg-[#00A763] text-white font-bold
                    rounded-md shadow hover:bg-[#009455] transition
                    focus:outline-none focus:ring-2 focus:ring-[#00A763]/50
                    "
                    onClick={() => {
                        navigate(`/`)
                    }}
                >
                    Home
                </button>
            </nav>
        </div>
    )
}
export default MobileHistory