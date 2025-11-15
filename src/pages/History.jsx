import DasktopHistory from "./HistoryLayouts/DasktopHistory";
import MobileHistory from "./HistoryLayouts/MobileHistory";


const LOCAL_STORAGE_KEY = "parkingAppData";

function History() {

    return (
        <>
            <div className="hidden lg:block">
                <DasktopHistory/>
            </div>
            <div className="block lg:hidden">
                <MobileHistory/>
            </div>
        </>
    )
}

export default History;