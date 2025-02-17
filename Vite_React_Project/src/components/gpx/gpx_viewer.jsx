import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";

const GpxViewer = () => {
  const [positions, setPositions] = useState([]);

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

  return (
    <div>
      <input type="file" accept=".gpx" onChange={handleFileUpload} />
      {positions.length > 0 && (
        <MapContainer
          center={positions[0]}
          zoom={9}
          style={{ height: "50vh", width: "100uw", marginTop: "1rem" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline pathOptions={{ color: "blue" }} positions={positions} />
        </MapContainer>
      )}
    </div>
  );
};

export default GpxViewer;
