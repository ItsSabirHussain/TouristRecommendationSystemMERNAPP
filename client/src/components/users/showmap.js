import React from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{
        lat: 25.2744,
        lng: 133.7751
      }}
      fullscreenontrol="true"
    >
      {props.markers.map(marker => {
        return (
          <Marker
            key="283229"
            position={{ lat: marker.latitude, lng: marker.longitude }}
          >
            {props.selectedMarker === marker && <InfoWindow></InfoWindow>}}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default function Map() {
  const lat = localStorage.getItem("lat");
  const lng = localStorage.getItem("lng");

  return (
    <MapWithAMarker
      markers={[
        {
          id: 0,
          latitude: Number(lat),
          longitude: Number(lng)
        }
      ]}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}
