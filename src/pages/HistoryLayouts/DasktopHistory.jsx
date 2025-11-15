import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logo from '../../assets/logo.png';

const LOCAL_STORAGE_KEY = "parkingAppData";

function DasktopHistory() {

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
        <div className="flex flex-row w-screen h-screen bg-gray-200">
            <aside className="w-64 bg-white border-r shadow-lg flex flex-col justify-between py-10 px-6">
                <div>
                    <img src={Logo} className="mb-8" />
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    className="
                                            flex justify-center items-center gap-3.5
                                            mt-4 w-full py-2 px-4
                                            bg-[#00A763] text-white font-bold
                                            rounded-md shadow hover:bg-[#009455] transition
                                            focus:outline-none focus:ring-2 focus:ring-[#00A763]/50
                                            "
                                    onClick={() => { navigate("/") }}
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-[#00A763] m-16 flex flex-col flex-1 min-h-0">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-[#00A763]">Histórico</h2>
                </div>
                <div className="bg-[#F6F8F9] rounded-t-lg border-b px-8 py-4 flex items-center">
                    <span className="w-2/3 text-[#00A763] font-bold text-lg tracking-wide">Descrição</span>
                    <span className="w-1/3 text-gray-500 font-semibold text-right text-md">Data e Hora</span>
                </div>
                <div className="w-full flex-1 min-h-0 overflow-y-auto" style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                }}>
                    <div className="divide-y divide-gray-100">
                        {history.length > 0 ? (
                            history.map((entry, idx) => {
                                const date = new Date(entry.date)
                                return (
                                    <div
                                        key={idx}
                                        className="
                                        group flex items-center px-8 py-5 min-h-[64px]
                                        hover:bg-[#E7FAF0] transition rounded-r-lg relative
                                        cursor-pointer
                                        "
                                    >
                                        <div className="
                                        absolute left-0 top-0 h-full w-1 bg-[#00A763]
                                        opacity-0 group-hover:opacity-100 transition">
                                        </div>

                                        <img
                                            src={entry.image || "https://via.placeholder.com/48x48?text=No+Image"}
                                            alt="imagem do estacionamento"
                                            className="w-12 h-12 rounded-md object-cover mr-6 border border-gray-200 bg-gray-100"
                                            onError={e => e.currentTarget.src = "https://via.placeholder.com/48x48?text=No+Image"}
                                        />

                                        <span className="w-2/3 text-gray-900 font-medium truncate">
                                            {entry.description}
                                        </span>
                                        <span className="w-1/3 text-gray-400 text-right text-sm">
                                            {date.toLocaleString()}
                                        </span>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="flex flex-col items-center py-16 bg-white rounded-b-lg">
                                {/* Empty State Icon (SVG) */}
                                <svg className="mb-4 w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="16" rx="2" />
                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                                <p className="text-gray-400 text-lg">Não há estacionamentos recentes...</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DasktopHistory;