



import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ apiUrl, center = [51.505, -0.09], zoom = 10, height = 400 }) => {
  const [vehicles, setVehicles] = useState([]);

  // Fetch vehicle positions every 5 seconds
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setVehicles(data.vehicles || []); // Ensure vehicles exist in response
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    // Fetch initially and then every 5 seconds
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [apiUrl]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700" style={{ height: `${height}px` }}>
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render Vehicle Markers */}
        {vehicles.map((vehicle, index) => (
          <Marker key={index} position={[vehicle.lat, vehicle.lng]}>
            <Popup>
              <div className="p-2 text-sm">
                <strong className="text-blue-600">{vehicle.name}</strong>
                <p>Speed: {vehicle.speed} km/h</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

