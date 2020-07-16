import _ from "lodash";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_favorite_places, get_my_routes } from "../redux/travels/action";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Navbar from "../components/Navbar";
import FavoritePlaces from "../components/FavoritePlaces";
import SingleLineGridListOfMaps from "../components/SingleLineGridListOfMaps";
import GoogleMapForFavoritePlaces from "../components/GoogleMap/GoogleMapForFavoritePlaces";
// import GoogleMapForRouteView from "../components/GoogleMap/GoogleMapForRouteVIew";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const userpage = (props) => {
  const userLoginFlag = useSelector((state) => state.users.loginFlag);
  const userId = useSelector((state) => state.users.userId);
  const idToken = useSelector((state) => state.users.idToken);
  const favoritePlaces = useSelector((state) => state.travels.favoritePlaces);
  const myRoutes = useSelector((state) => state.travels.myRoutes);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("now loading my favorite places");
    if (userLoginFlag) {
      const opt = {
        method: "get",
        params: {
          userId,
        },
        headers: {
          Authorization: idToken,
        },
        url: "/favoriteSpot",
      };
      axios(opt).then((res) => {
        const removeDuplication = _.uniqBy(
          JSON.parse(res.data.body),
          JSON.stringify
        );
        dispatch(get_favorite_places(removeDuplication));
      });
    }
    console.log("now loading my favorite routes");
    if (userLoginFlag) {
      const opt = {
        method: "get",
        params: {
          userId,
        },
        headers: {
          Authorization: idToken,
        },
        url: `/savedRoutes`,
      };
      axios(opt).then((res) => {
        const routesAndSchedules = JSON.parse(res.data.body);
        const schedules = routesAndSchedules.map((data) => data.schedules);
        dispatch(get_my_routes(schedules));
      });
    }
  }, []);

  console.log("myRoute", myRoutes);

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Navbar />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {favoritePlaces.length > 0 && (
                <FavoritePlaces favoritePlaces={favoritePlaces} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {favoritePlaces.length > 0 && myRoutes.length > 0 && (
                <GoogleMapForFavoritePlaces
                  favoritePlaces={favoritePlaces}
                  myRoute={myRoutes[0]}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default userpage;
