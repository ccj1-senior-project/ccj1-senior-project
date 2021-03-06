import _ from "lodash";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_favorite_places } from "../redux/travels/action";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Navbar from "../components/Navbar";
import ScheduleForUserPage from "../components/ScheduleForUserPage";

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

const recommend = (props) => {
  const userLoginFlag = useSelector((state) => state.users.loginFlag);
  const userId = useSelector((state) => state.users.userId);
  const idToken = useSelector((state) => state.users.idToken);
  const targetPrefecture = useSelector((state) => state.map.targetPrefecture);
  const [myRoutesAndSchedules, setMyRoutesAndSchedules] = useState(null);

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
    if (!targetPrefecture.pref) {
      console.log(`now loading recommend of all prefectures `);
      const opt = {
        method: "get",
        url: "/routes",
      };
      axios(opt).then((res) => {
        const removeDuplication = _.uniqBy(
          JSON.parse(res.data.body),
          JSON.stringify
        );
        setMyRoutesAndSchedules(removeDuplication);
      });
    }
    if (targetPrefecture.pref) {
      console.log(`now loading recommend of ${targetPrefecture.pref} `);
      const opt = {
        method: "get",
        params: {
          prefecture: targetPrefecture.pref,
        },
        url: "/routes",
      };
      axios(opt).then((res) => {
        const removeDuplication = _.uniqBy(
          JSON.parse(res.data.body),
          JSON.stringify
        );
        setMyRoutesAndSchedules(removeDuplication);
      });
    }
  }, [targetPrefecture]);

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
              <Typography variant="h4" gutterBottom>
                みんなの旅をみる
              </Typography>
            </Paper>
          </Grid>
          {!targetPrefecture.pref && (
            <Grid>
              <Paper className={classes.paper}>
                <Typography variant="h4" gutterBottom>
                  都道府県を選んでください
                </Typography>
              </Paper>
            </Grid>
          )}
          {targetPrefecture.pref && (
            <>
              {myRoutesAndSchedules && myRoutesAndSchedules.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <ScheduleForUserPage
                      myRoutesAndSchedules={myRoutesAndSchedules}
                    />
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
      </div>
    </>
  );
};

export default recommend;
