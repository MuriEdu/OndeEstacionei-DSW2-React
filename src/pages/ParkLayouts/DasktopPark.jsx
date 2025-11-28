import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Logo from "../../assets/logo.png";
import Map from "../../components/Map";

const LOCAL_STORAGE_KEY = "parkingAppData";

export default function DasktopPark() {

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
        <div className="min-h-screen min-w-screen flex bg-gray-100 font-sans">

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
                                    onClick={() => {navigate("/")}}
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                    <button
                                        className="
                                flex justify-center items-center gap-3.5
                                mt-4 w-full py-2 px-4
                                bg-[#00A763] text-white font-bold
                                rounded-md shadow hover:bg-[#009455] transition
                                focus:outline-none focus:ring-2 focus:ring-[#00A763]/50
                                "
                                    onClick={() => {navigate("/history")}}
                                >
                                    Histórico
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            <main className="flex-1 flex flex-col items-center justify-center p-16">
                <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-12">
                    <h2 className="text-3xl font-bold text-green-700 mb-10 text-center">Estacionar</h2>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="rounded-xl border h-80">
                            <Map location={{ latitude: latitude, longitude: longitude }} size={{ w: 60, h: 80 }} />
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
                                <label htmlFor="upload" className="flex flex-col items-center w-full h-full cursor-pointer">
                                    {image ? (
                                        <img src={image} alt="Estacionamento" className="max-w-full max-h-32 rounded-lg" />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="text-base text-gray-700">Selecione uma imagem de onde estacionou</div>
                                        </div>
                                    )}
                                </label>
                                <input
                                    id="upload"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </div>
                            <button
                                className="bg-green-700 text-white py-3 rounded-xl font-semibold text-lg shadow hover:bg-green-800 transition"
                                onClick={handleSave}
                                disabled={!name || !image}
                            >
                                Estacionar
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
