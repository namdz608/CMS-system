import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";



const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Ideas</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total ideas made today</p>
        <p className="amount">20 ideas</p>
        <p className="desc">
          Ideas of the staff is something
        </p>
      </div>
    </div>
  );
};

export default Featured;
