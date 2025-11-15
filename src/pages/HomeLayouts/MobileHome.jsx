import { useEffect, useState } from "react"
import { FaHistory, FaRegMap } from "react-icons/fa"
import { useNavigate } from "react-router"
import Logo from "../../assets/logo.png"
import Map from "../../components/Map"
import ParkedNavBar from "../../components/ParkedNavBar"
import { getLocation } from "../../utils/geolocationApi"

const LOCAL_STORAGE_KEY = "parkingAppData";

function MobileHome() {

    const navigate = useNavigate()
    const [location, setLocation] = useState({ latitude: 42.360091, longitude: -71.09416 })
    const [history, setHistory] = useState([])


    const getUserLocation = async () => {
        const userLocation = await getLocation()
        setLocation(userLocation)
    }

    const getHistory = async () => {
        const localHistory = await localStorage.getItem(LOCAL_STORAGE_KEY)
        setHistory(localHistory ? JSON.parse(localHistory) : [])
    }

    useEffect(() => {
        getUserLocation()
        getHistory()
    }, [])

    return (
        <div>
            <header className="fixed w-screen h-fit flex justify-center items-center p-8 bg-gray-100 top-0 z-10000 rounded-b-2xl ">
                <img src={Logo} />
            </header>
            <Map location={location} />
            {
                (history.length > 0 && history[0].parked) ?
                    <ParkedNavBar parks={history} crr={history[0]} z={1000} /> :
                    <nav className="fixed w-screen h-1/5 bottom-0 z-1000 flex flex-row justify-center items-center gap-4 px-8 py-16 rounded-t-2xl bg-gradient-to-t from-white/95 to-white/0">
                        <button
                            className="
                    mt-4
                    text-4xl
                    flex justify-center items-center gap-3.5
                    w-full py-2 px-4
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
                        <button
                            className="
                    mt-4
                    bg-[#00A763] text-white font-semibold
                    rounded-full shadow hover:bg-[#009455] transition
                    focus:outline-none focus:ring-2 focus:ring-[#00A763]/40
                        "
                            onClick={() => { navigate("history") }}
                        >
                            <FaHistory size={20} />
                        </button>
                    </nav>
            }
        </div>
    )

}
export default MobileHome