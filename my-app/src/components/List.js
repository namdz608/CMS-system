import "./list.scss"
import Sidenav from "../layouts/sidenav/Sidenav"
import Navbar from "../layouts/navbar/Navbar"
import Datatable from "../components/datatable/Datatable"

const List = () => {
  return (
    <div className="list">
      <Sidenav/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List