async function getWeather() {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=38.406407&lon=27.185660&appid=bd5e378503939ddaee76f12ad7a97608&units=metric");
        if (!response.ok) throw new Error(`API Hatası: ${response.status}`);

        const data = await response.json();
        console.log("İzmir API Yanıtı:", data);

        // 🌬️ Rüzgar hızını km/h olarak hesapla (m/s * 3.6)
        const windSpeedKmh = data.wind.speed ? (data.wind.speed * 3.6).toFixed(1) : "N/A";
 
        document.getElementById("city").innerHTML = `${data.name} 📍`;



        const now = new Date();
        const ay = now.toLocaleString("tr-TR", { month: "long" }); // Mart
        const gun = now.getDate(); // 23
        const haftaGunu = now.toLocaleString("tr-TR", { weekday: "long" }); // Perşembe

        document.getElementById("city").innerHTML = `${data.name} 📍`;
        document.getElementById("date").innerHTML = `${ay}, ${gun}, ${haftaGunu}`;


        document.getElementById("temp").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // 🌡️ Diğer bilgiler
        document.getElementById("humidity").innerHTML = data.main.humidity ? `${data.main.humidity}%` : "N/A";
        document.getElementById("visibility").innerHTML = data.visibility ? `${data.visibility / 1000} km` : "N/A";
        document.getElementById("pressure").innerHTML = data.main.pressure ? `${data.main.pressure} hPa` : "N/A";
        document.getElementById("wind").innerHTML = `${windSpeedKmh} km/h`;

    } catch (error) {
        console.error("Hata:", error.message);
    }
}

// **Sayfa yüklendiğinde hava durumu bilgisini gelir**
window.onload = getWeather;