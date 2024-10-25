import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import './App.css';

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "todo", headerName: "Todo", width: 500 },
  { field: "completed", headerName: "Completed", width: 150 },
  { field: "userId", headerName: "User Id", width: 150 },
];

const BASE_URL = 'https://dummyjson.com'

export default function App() {
  const [gridData, setGridData] = useState(null);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // set loader
    setLoading(true);
    axios.get(`${BASE_URL}/todos?limit=${paginationModel.pageSize}&skip=${paginationModel.page * paginationModel.pageSize}`).then(res => {
      // Set Grid Data
      setGridData(res.data);
      // Remove loader
      setLoading(false);

    }). catch(err => {
      console.log(err)
    })
  }, [paginationModel])
  
  return (
    <div>
      <div className="header-style">
        <div>ConnectWise TODO list</div>
      </div>
    <div style={{ display: "flex", justifyContent: "center", minHeight:400 }}>
      <br/>
      <div>
        {gridData && (<DataGrid 
          rows={gridData.todos}
          pagination 
          columns={columns}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          onPageSizeChange={(newPageSize) => setPaginationModel({ ...paginationModel, newPageSize })}
          rowSelectionModel={rowSelectionModel}
          pageSizeOptions={[5, 10, 20, 50, 100]} 
          rowCount={gridData.total} 
          loading={loading}
         />)}
      </div>
    </div>
    </div>
  );
}

