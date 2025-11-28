
import DasktopPark from "./ParkLayouts/DasktopPark";
import MobilePark from "./ParkLayouts/MobilePark";


function Park() {
    return (
        <>
            <div className="hidden lg:block">
                <DasktopPark/>
            </div>
            <div className="block lg:hidden">
                <MobilePark/>
            </div>
        </>
    )
}

export default Park
