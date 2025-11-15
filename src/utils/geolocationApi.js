// export async function getLocation() {
//     if (!navigator.geolocation) {
//         alert("seu navegador não suporta geolocalizacao");
//         return null;
//     } else {
//         return new Promise((resolve, reject) => {
//             const watchID = navigator.geolocation.watchPosition(
//                 (position) => {
//                     const latitude = position.coords.latitude;
//                     const longitude = position.coords.longitude;
//                     navigator.geolocation.clearWatch(watchID);
//                     resolve({latitude, longitude});
//                 },
//                 (error) => {
//                     alert(`ERROR(${error.code}): ${error.message}`);
//                     navigator.geolocation.clearWatch(watchID);
//                     reject(error);
//                 }
//             );
//             setTimeout(() => {
//                 navigator.geolocation.clearWatch(watchID);
//             }, 1000);
//         });
//     }
// }

export async function getLocation() {
    if (!navigator.geolocation) {
        alert("seu navegador não suporta geolocalizacao");
        return null;
    } else {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    alert(`ERROR(${error.code}): ${error.message}`);
                    reject(error);
                },
                { timeout: 10000 }
            );
        });
    }
}
