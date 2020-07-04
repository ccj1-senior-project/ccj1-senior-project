import Checkbox from "@material-ui/core/Checkbox";

const Item = (props) => {
  console.log(props.image);
  return (
    <>
      <div className="item__container">
        <div>
          <Checkbox
            defaultChecked
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>
        <div>
          <img src={props.image} />
        </div>
      </div>
      <style jsx>
        {`
          .item__container {
            display: flex;
          }
        `}
      </style>
    </>
  );
};

export default Item;
