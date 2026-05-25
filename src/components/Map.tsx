import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types";

type Props = {
  coords: Coords;
  onMapClick?: (lat: number, lon: number) => void;
};

export default function Map({ coords, onMapClick }: Props) {
  const { lat, lon } = coords;
  return (
    <div>
      <MapContainer
        center={[lat, lon]}
        zoom={5}
        style={{ width: "500px", height: "500px" }}
      >
        <MapClick onMapClick={onMapClick} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]} />
      </MapContainer>
    </div>
  );
}

function MapClick({
  onMapClick,
}: {
  onMapClick?: (lat: number, lon: number) => void;
}) {
  const map = useMap();

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    map.flyTo([lat, lng]);
    onMapClick?.(lat, lng);
  });

  return null;
}
