import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";

const GpxViewer = () => {
  const [positions, setPositions] = useState([]);
  const [mapType, setMapType] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const gpxData = e.target.result;

      // Parsear el XML usando DOMParser
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(gpxData, "text/xml");

      // Extraer puntos de la ruta
      const trackPoints = xmlDoc.getElementsByTagName("trkpt");
      const positions = [];

      for (let i = 0; i < trackPoints.length; i++) {
        const lat = parseFloat(trackPoints[i].getAttribute("lat"));
        const lon = parseFloat(trackPoints[i].getAttribute("lon"));
        positions.push([lat, lon]);
      }

      setPositions(positions);
    };

    reader.readAsText(uploadedFile);
  };

  const handleMapTypeChange = (event) => {
    setMapType(event.target.value);
  };

  return (
    <div>
      <input type="file" accept=".gpx" onChange={handleFileUpload} />
      <select
        onChange={handleMapTypeChange}
        value={mapType}
        className="form-select mt-3 w-50"
      >
        <option value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
          OpenStreetMap
        </option>
        <option value="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png">
          OpenTopoMap
        </option>
      </select>
      {positions.length > 0 && (
        <MapContainer
          center={positions[0]}
          zoom={9}
          style={{ height: "50vh", width: "100uw", marginTop: "1rem" }}
        >
          <TileLayer url={mapType} />
          <Polyline pathOptions={{ color: "blue" }} positions={positions} />
        </MapContainer>
      )}
    </div>
  );
};

export default GpxViewer;
