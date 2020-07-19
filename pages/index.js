import { useSelector, useDispatch } from "react-redux";
import { get_initial_status } from "../redux/travels/action";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import MapCategory from "../components/Category/MapCategory";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import { categoryMap } from "../components/GoogleMap/mapUtils/pref";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 90,
    backgroundColor: "#2b90d9",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.5em",
    },
  },
}));

const Index = (props) => {
  const [pref, setPref] = useState("");
  const classes = useStyles();
  return (
    <div className="top">
      <Navbar />
      <div className="back">
        <div class="bgImg src1"></div>
        <div class="bgImg src2"></div>
        <div class="bgImg src3"></div>
        <div class="bgImg src4"></div>
        <div>
          <h2 className="back__h2 fadein">あなたの旅を</h2>
          <h2 className="back__h2--delay fadein">
            <span className="merge" /> サポートします
          </h2>
          <div className="search-container">
            <div className="search-bar">
              <p className="result">{pref.pref}</p>

              <Link
                href={{
                  pathname: "map",
                  query: { lat: pref.lat, lng: pref.lng, pref: pref.pref },
                }}
              >
                <Button className={classes.root} variant="contained">
                  調べる
                </Button>
              </Link>
            </div>
            <div className="prefecture">
              <h2 className="select">調べたい都道府県を選んでください</h2>

              <div className="small__container">
                <div></div>
                <Grid container spacing={6} justify="center">
                  {categoryMap.map((obj) => (
                    <Grid item xs={6} sm={3}>
                      <MapCategory
                        feeld={obj.feeld}
                        category={obj.category}
                        setLocation={(obj) => setPref(obj)}
                        pref={pref}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
      .back{
        background-image: url("http://sozai-free.com/sozai/jpg/img_0315.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        height:100vh;
        width: 100%;
      }
        img {
          width: 100%;
          
        }
        .search-bar {
          display:flex;
          height:4rem;
          
          align-items:center;
          margin-top: 20px;
          text-align: center;
        }
        
        #text {
          width: 50%;
          padding: 10px 15px;
          font-size: 16px;
          border-radius: 3px;
          border: 2px solid #ddd;
          box-sizing: border-box;
          margin-right: 15px;
        }
        .btn-border {
          display: inline-block;
          max-width: 180px;
          text-align: left;
          border: 2px solid #6aafe6;
          font-size: 16px;
          color: #6aafe6;
          text-decoration: none;
          font-weight: bold;
          padding: 8px 16px;
          border-radius: 4px;
          transition: 0.4s;
          background-color: white;
        }
        .btn-border:hover {
          background-color: #6aafe6;
          border-color: #6aafe6;
          color: #fff;
        }
        .prefecture {
          
          position: relative;
          height: 22em;
          margin: 0 15%;
          margin-top: 30px;
        }
        .small__container{
          width:100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          -webkit- transform: translateY(-50%) translateX(-50%);
        }
       
         
        .search-container{
          border-radius:5%;
          background-color:#d9e1e8;
          opacity:0.8;
          width:80%;
          margin:0 auto;
        }
       .result{
         margin-left:30%;
         width:40%;
         font-family: 'Noto Serif JP', sans-serif;
        padding: 10px 15px;
        font-size: 200%;
        box-sizing: border-box;
        margin-right: 15px;
       }

       .merge{
         margin-left:10%;
       }

       .fadein{
        opacity: 0;
        animation: fadein 3s ease forwards;
       }
       .back__h2{
        padding:1%;
        font-size:3em;
        font-family: 'Noto Serif JP', sans-serif;
        
       }

    .back__h2--delay{
      animation-delay: 2s;
        font-size:3em;
        font-family: 'Noto Serif JP', sans-serif;
        margin-bottom:2em;
    }

    


    @media screen and (max-width: 480px) { 
      .result{
        font-size:130%;
       
      }
      .back__h2{
        padding:2%;
        font-size:1.5em;
        font-family: 'Noto Serif JP', sans-serif;
        
       }
       .back__h2--delay{
       
          font-size:1.5em;
          font-family: 'Noto Serif JP', sans-serif;
          margin-bottom:1em;
      }
      .prefecture{
        position: relative;
       height: 22em;
       margin: 0 ;
      margin-top: 30px;
      }

      .search-container{
        border-radius:5%;
        background-color:#d9e1e8;
        opacity:0.8;
        width:90%;
        padding: 0 10px;
        margin:0 auto;
      }
    }


      

       .select{
        font-family: 'Noto Serif JP', sans-serif;
        text-align:center;
       }

       box .src1 {
        background-image: url("http://sozai-free.com/sozai/jpg/img_0315.jpg");
      }
      .box .src2 {
        background-image : url("http://sozai-free.com/sozai/jpg/crw_4044_jfr.jpg");   /* 背景の画像を指定 */
        animation-delay  : 5s;
      }
      .box .src3 {
        background-image : url("http://sozai-free.com/sozai/jpg/crw_0952_jfr.jpg");   /* 背景の画像を指定 */
        animation-delay  : 10s;
      }
      .box .src4 {
        background-image : url("http://sozai-free.com/sozai/jpg/crw_1441_jfr.jpg");   /* 背景の画像を指定 */
        animation-delay  : 15s;
      }

     
      @keyframes fadein {
     
      100% {
        opacity: 1;
        transform: translateY(0);
      }
      }
      `}</style>
    </div>
  );
};

export default Index;
