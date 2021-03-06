import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import SingleLineGridListForUserPage from "../components/SingleLineGridListForUserPage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    fontSize: theme.typography.pxToRem(25),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: "25%",
    alignSelf: "center",
  },
  button: { flexBasis: "20%" },
  margin: { flexBasis: "35%" },
}));

export default function ScheduleOfADayOfMaps({
  schedules,
  routeInfo,
  routeName,
  userName,
}) {
  const classes = useStyles();
  const distanceInKm =
    routeInfo.length > 0
      ? Math.round(
          routeInfo
            .map((route) => route.distance.value)
            .reduce((prev, curr) => prev + curr) / 1000
        )
      : null;
  const durationInSec =
    routeInfo.length > 0
      ? routeInfo
          .map((route) => route.duration.value)
          .reduce((prev, curr) => prev + curr)
      : null;

  const durationTime = durationInSec
    ? new Date(durationInSec * 1000).toISOString().substr(11, 5)
    : null;

  // console.log("this is the schedule", schedules);
  // console.log("this is the routeInfo", routeInfo);
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {routeName && (
            <Typography className={classes.root} item={4}>
              {routeName} by {userName}
            </Typography>
          )}
          <Typography className={classes.heading} item={4}>
            移動距離： {distanceInKm}km
          </Typography>
          <Typography className={classes.heading} item={4}>
            所要時間： {durationTime}
          </Typography>
          <div className={classes.margin} />
        </AccordionSummary>
        <AccordionDetails>
          <SingleLineGridListForUserPage
            schedules={schedules}
            routeInfo={routeInfo}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
