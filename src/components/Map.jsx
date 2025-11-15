

import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

function SetViewOnLocationChange({ location }) {
    const map = useMap();
    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            map.setView([location.latitude, location.longitude]);
        }
    }, [location, map]);
    return null;
}

export default function Map({ location, size, full }) {

    let mapSize = size? `w-${size.w} h-${size.h}` : 'w-screen h-screen'

    return (
        <MapContainer center={[location.latitude, location.longitude]} zoom={16} className={full ? "size-full" : mapSize}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.latitude, location.longitude]} >
                <Popup>
                    This is a popup
                </Popup>
            </Marker>
            <SetViewOnLocationChange location={location}/>
        </MapContainer>
    );
}