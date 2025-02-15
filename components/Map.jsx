"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const Map = ({ address }) => {
  const Map = dynamic(() => import("./Map"), { ssr: false });

  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      // Get location coordinates from the address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&addressdetails=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates([parseFloat(lat), parseFloat(lon)]);
      }
    };

    fetchCoordinates();
  }, [address]);

  if (!coordinates) {
    return (
      <div>
        <p>No map with the exact location available.</p>
      </div>
    );
  }

  // Create custom markup icon
  const iconMarkup = renderToStaticMarkup(
    <FaMapMarkerAlt className="text-red-500 text-3xl" />
  );
  const customIcon = L.divIcon({
    html: iconMarkup,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: "",
  });

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coordinates} icon={customIcon}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
