import { useEffect, useState } from "react";
import FloatingDasktopMenu from "../../components/FloatingDasktopMenu";
import FloatingDasktopParked from "../../components/FloatingDasktopParked";
import MapComponent from "../../components/Map";
import { getLocation } from "../../utils/geolocationApi";

const LOCAL_STORAGE_KEY = "parkingAppData";

function DasktopHome() {

    const getUserLocation = async () => {
        const userLocation = await getLocation()
        setLocation(userLocation)
    }
    const getHistory = async () => {
        const localHistory = await localStorage.getItem(LOCAL_STORAGE_KEY)
        setHistory(localHistory ? JSON.parse(localHistory) : [])
    }

    const [location, setLocation] = useState({ latitude: 42.360091, longitude: -71.09416 })
    const [history, setHistory] = useState([])


    useEffect(() => {
        getUserLocation()
        getHistory()
    }, [])

    const lastThreeParks = history.slice(0, 3)

    return (
        <div>
            <div className="fixed flex-col top-0 right-0 z-1000 m-20 w-100 h-fit  justify-center items-center rounded-md">

                {(history.length > 0 && history[0].parked) ? 
                    <FloatingDasktopParked parks={history} crr={history[0]}/> :
                    <FloatingDasktopMenu threeLeastParks={lastThreeParks} location={location}/>
                }

                
            </div>
            <MapComponent location={location} />
        </div>
    )
}

export default DasktopHome;