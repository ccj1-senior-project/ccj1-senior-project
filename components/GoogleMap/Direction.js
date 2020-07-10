import React, { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change_direction } from "../../redux/travels/action";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

export default function Direction({ origin, destination, activityLocations }) {
  // const [currentDirection, setCurrentDirection] = useState(null);
  const dispatch = useDispatch();
  const currentDirection = useSelector(
    (state) => state.travels.currentDirection
  );
  //   const origin = { lat: 42.755955, lng: 141.32816 };
  //   const destination = { lat: 45.299023, lng: 141.65308 };
  //   const activityLocations = [
  //     {
  //       location: { lat: 43.66406, lng: 142.85445 },
  //       stopover: true,
  //     },
  //     { location: { lat: 43.906742, lng: 144.79872 } },
  //     { location: { lat: 43.286533, lng: 143.18524 } },
  //   ];

  const directionsCallback = useCallback((googleResponse) => {
    if (googleResponse) {
      if (currentDirection) {
        if (
          googleResponse.status === "OK" &&
          googleResponse.geocoded_waypoints.length !==
            currentDirection.geocoded_waypoints.length
        ) {
          dispatch(change_direction(googleResponse));
          console.log(
            "case1: new wayPoint is added, response =>: ",
            googleResponse
          );
        } else {
          console.log(
            "case2: stop rendering to avoid inifinit loop, response =>: ",
            googleResponse
          );
        }
      } else {
        if (googleResponse.status === "OK") {
          console.log(
            "case3: third place is located, response =>",
            googleResponse
          );
          dispatch(change_direction(googleResponse));
        } else {
          console.log("case4: error, response => ", googleResponse);
        }
      }
    }
  });

  return (
    <>
      <DirectionsService
        options={{
          origin,
          destination,
          travelMode: "DRIVING",
          optimizeWaypoints: true,
          waypoints: activityLocations,
        }}
        callback={directionsCallback}
      />
      {currentDirection !== null && (
        <DirectionsRenderer
          options={{
            directions: currentDirection,
          }}
        />
      )}
    </>
  );
}
