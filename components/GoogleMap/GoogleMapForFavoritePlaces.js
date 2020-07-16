import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import DirectionForUserPage from "./DirectionForUserPage";
import SingleLineGridList from "../SingleLineGridList";
import ActivityForFavoritePlaces from "./ActivityForFavoritePlaces";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "./mapUtils/mapStyles";

const favoriteIcon =
  "https://firebasestorage.googleapis.com/v0/b/tidal-reactor-279300.appspot.com/o/kamo%2F%E3%83%8F%E3%83%BC%E3%83%88%E3%81%AE%E3%83%9E%E3%83%BC%E3%82%AF3.svg?alt=media&token=485153b6-3a71-4443-bf2f-b2eaf1d033e5";

const libraries = ["places"];
const mapContainerStyle = {
  height: "60vh",
  width: "100vw",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function GoogleMapForFavoritePlaces({
  // favoritePlaces,
  myRoute,
}) {
  // const favoritePlaces = useSelector((state) => state.travels.favoritePlaces);
  const origin = myRoute[0].location;
  const destination = myRoute[myRoute.length - 1].location;
  const activityLocations = myRoute
    .slice(1, myRoute.length - 1)
    .map((activity) => {
      return { location: activity.location };
    });

  // const [selected, setSelected] = useState(null);
  // const [open, setOpen] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_googleMapsApiKey,
    libraries,
  });

  const router = useRouter();

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  // const handleClose = useCallback(() => {
  //   setOpen(false);
  // }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={{
          lat: Number(router.query.lat) || 40,
          lng: Number(router.query.lng) || 138,
        }}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <ActivityForFavoritePlaces />
        {/* {favoritePlaces.map((marker, index) => (
          <Marker
            key={`${marker.location.lat * (index + 1)}`}
            position={{
              lat: marker.location.lat,
              lng: marker.location.lng,
            }}
            onMouseOver={() => {
              setSelected(marker);
            }}
            onClick={() => {
              setOpen(true);
            }}
            icon={{
              url: favoriteIcon,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))} */}
        {/* {selected ? (
          <InfoWindow
            position={{
              lat: selected.location.lat,
              lng: selected.location.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  {selected.name}
                </span>
              </h2>
              <img src={selected.image} />
            </div>
          </InfoWindow>
        ) : null} */}
        {/* <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {selected ? selected.name : null}
          </DialogTitle>
          <DialogContent>
            {selected ? (
              <>
                <img src={selected.image} width="100%" />

                {selected.reviews.map((review, index) => (
                  <div key={`${review.title}+${index}`}>
                    <Typography>{review.title}</Typography>
                    <DialogContentText id="alert-dialog-description">
                      {review.published_date}
                    </DialogContentText>
                    <Rating
                      name="read-only"
                      value={Number(review.rating)}
                      readOnly
                    />
                    <DialogContentText id="alert-dialog-description">
                      {review.text}
                    </DialogContentText>
                  </div>
                ))}
              </>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              戻る
            </Button>
          </DialogActions>
        </Dialog> */}
        {myRoute.length > 2 && (
          <DirectionForUserPage
            origin={origin}
            destination={destination}
            activityLocations={activityLocations}
          />
        )}
      </GoogleMap>
    </div>
  );
}
