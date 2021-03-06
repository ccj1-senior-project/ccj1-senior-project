import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.success.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));
const icon =
  "https://firebasestorage.googleapis.com/v0/b/tidal-reactor-279300.appspot.com/o/kamo%2F%E3%83%8F%E3%82%99%E3%82%A4%E3%82%AF%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3.svg?alt=media&token=260673d7-dafc-4496-b5d1-2a41ffab66a6";

export default function SingleLineGridListForUserPage({
  schedules,
  routeInfo,
}) {
  const classes = useStyles();
  const routeInfoAndSchedules = [];
  for (let i = 0; i < schedules.length; i++) {
    routeInfoAndSchedules.push(schedules[i]);
    if (i !== schedules.length - 1) routeInfoAndSchedules.push(routeInfo[i]);
  }

  if (schedules.length <= 2) {
    console.log(
      "route and schedule are combined, but not rendered because route is not calculated",
      routeInfoAndSchedules
    );
  } else if (
    schedules.length > 2 &&
    schedules.length - 1 === routeInfo.length
  ) {
    console.log(
      "route and schedule are combined and rendered",
      routeInfoAndSchedules
    );
  } else {
    console.log(
      "route and schedule are combined, but not rendered because only schedule is revised and routeInfo is not revised",
      routeInfoAndSchedules
    );
  }

  return (
    <>
      {schedules.length > 2 && schedules.length - 1 === routeInfo.length && (
        <div className={classes.root}>
          <GridList spacing={10} className={classes.gridList} cols={2.5}>
            {routeInfoAndSchedules.map((activity, index) => (
              <div key={`${index}`}>
                {index % 2 === 0 ? (
                  <GridListTile key={`${activity.location.lat * (index + 1)}`}>
                    <img src={activity.image} alt={activity.name} />
                    <GridListTileBar
                      title={activity.name}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                    />
                  </GridListTile>
                ) : (
                  <GridListTile key={`${activity.distance.value}`}>
                    <div>所要時間</div>
                    <div>
                      {new Date(activity.duration.value * 1000)
                        .toISOString()
                        .substr(11, 8)
                        .slice(0, -3)}
                    </div>
                    <img src={icon} alt="routeInfo" />
                    <div>{Math.round(activity.distance.value / 1000)}km</div>
                  </GridListTile>
                )}
              </div>
            ))}
          </GridList>
        </div>
      )}
    </>
  );
}
