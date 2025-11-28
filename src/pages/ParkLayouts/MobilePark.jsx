import { useEffect, useState } from "react";
import { FaMinusCircle, FaRegMap } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router";
import Logo from "../../assets/logo.png";
import Map from "../../components/Map";

const LOCAL_STORAGE_KEY = "parkingAppData";

function MobilePark() {

    const navigate = useNavigate()

    const [history, setHistory] = useState([])
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [searchParams, setSerachParams] = useSearchParams()
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")

    useEffect(() => {
        const jsonHistory = localStorage.getItem(LOCAL_STORAGE_KEY)
        setHistory(jsonHistory ? JSON.parse(jsonHistory) : [])
    }, [])

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (name && latitude && longitude && history) {

            const newHistory = [
                {
                    description: name,
                    date: new Date(),
                    location: { latitude, longitude },
                    image: image ? image : null,
                    parked: true
                },
                ...history
            ];

            setHistory(newHistory);
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(newHistory)
            );
            alert("Estacionamento Registrado!");
            navigate("/")

        }
    };

    return (
        <div className="w-screen h-screen bg-gray-200 flex flex-col mb-40">
            <header className="fixed z-10000 w-screen h-fit flex justify-center items-center p-8 bg-gray-100 rounded-b-2xl ">
                <img src={Logo} />
            </header>
            <div className="flex h-fit flex-col gap-8 p-8 bg-gray-200 mt-24 ">
                <div className="rounded-xl border h-60">
                    <Map location={{ latitude: latitude, longitude: longitude }} size={{ w: 60, h: 60 }} />
                </div>
                <div className="flex flex-col justify-between text-gray-800">
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mb-6 h-12 px-4 rounded-lg border border-gray-300 text-lg"
                    />
                    <div className="h-fit border-2 border-dashed border-green-400 bg-gray-50 rounded-xl flex items-center justify-center cursor-pointer mb-4 p-8">
                        <label htmlFor="uploadImg" className="flex flex-col items-center w-full h-full cursor-pointer">
                            {image ? (
                                <img src={image} alt="Estacionamento" className="max-w-full max-h-32 rounded-lg" />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="text-base text-gray-700">Selecione uma imagem de onde estacionou</div>
                                </div>
                            )}
                        </label>
                        <input
                            id="uploadImg"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            </div>
            <nav className="
                w-full
                flex flex-col justify-center items-center gap-3
                px-4 sm:px-8 md:px-16
                py-8
                rounded-t-2xl bg-gray-100 flex-1
                fixed bottom-0 z-10000
                z-10
                "
            >
                <button
                    className="
                    text-lg sm:text-xl md:text-2xl lg:text-3xl
                    flex justify-center items-center gap-3
                    w-full min-h-[48px]
                    bg-[#00A763] text-white font-bold
                    rounded-md shadow hover:bg-[#009455] transition
                    focus:outline-none focus:ring-2 focus:ring-[#00A763]/50
                    "
                    onClick={handleSave}
                    aria-label="Estacionar"
                >
                    <FaRegMap size={20} />
                    <span >Estacionar</span>
                </button>
                <button
                    className="
                    text-lg sm:text-xl md:text-2xl lg:text-3xl
                    flex justify-center items-center gap-3
                    w-full min-h-[48px]
                    bg-[#ff2d1a] text-white font-bold
                    rounded-md shadow hover:bg-[#9a0101] transition
                    focus:outline-none focus:ring-2 focus:ring-[#ff2d1a]/50
                    "
                    onClick={() => { navigate("/") }}
                    aria-label="Cancelar"
                >
                    <FaMinusCircle size={20} />
                    <span>Cancelar</span>
                </button>
            </nav>

        </div>
    )
}
export default MobilePark