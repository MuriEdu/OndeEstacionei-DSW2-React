import DasktopHome from "./HomeLayouts/DasktopHome";
import MobileHome from "./HomeLayouts/MobileHome";

function Home() {


    return (
        <>
            <div className="hidden lg:block">
                <DasktopHome />
            </div>
            <div className="block lg:hidden">
                <MobileHome />
            </div>
        </>
    )
}

export default Home;