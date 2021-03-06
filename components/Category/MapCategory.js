import React from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import { set_prefecture } from "../../redux/map/action";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#2b90d9",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2b90d9",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%",
    },
  },
}));

export default function CustomizedMenus(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggle = (obj) => {
    const pref = JSON.stringify(obj);
    const o = JSON.stringify(props.pref);

    if (pref === o) {
      props.setLocation({ pref: "" });
      dispatch(set_prefecture(""));
    } else {
      props.setLocation(obj);

      dispatch(set_prefecture(obj.pref));
    }
  };

  const result = props.feeld.map((obj, index) => {
    return (
      <div key={`${index}`} className="item" onClick={() => toggle(obj)}>
        <StyledMenuItem>
          <ListItemIcon>
            <DirectionsRunIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={obj.pref} />
        </StyledMenuItem>
      </div>
    );
  });

  return (
    <div className="item">
      <Button
        className={classes.root}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        {props.category}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {result}
      </StyledMenu>
      <style jsx>{`
        .item {
          font-family: "Noto Serif JP", sans-serif;
        }
      `}</style>
    </div>
  );
}
