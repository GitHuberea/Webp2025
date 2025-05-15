import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box } from '@mui/material';
import './index.css';

export default function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(
      'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
    )
      .then((res) => res.json())
      .then((res) => {
        // 加入 id 欄位供 DataGrid 使用
        const processed = res.map((item, index) => ({
          id: index + 1,
          title: item.title || '無資料',
          location: item.showInfo?.[0]?.location || '無資料',
          price: item.showInfo?.[0]?.price || '無資料',
        }));
        setData(processed);
        setFilteredData(processed);
      });
  }, []);

  useEffect(() => {
    const keyword = searchTerm.toLowerCase();
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(keyword)
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const columns = [
    { field: 'title', headerName: '名稱', flex: 1 },
    { field: 'location', headerName: '地點', flex: 1 },
    { field: 'price', headerName: '票價', flex: 1 },
  ];

  return (
    <Box sx={{ width: '100%', height: 600, p: 2 }}>
      <h1>景點觀光展覽資訊</h1>
      <TextField
        label="搜尋名稱"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <DataGrid
        rows={filteredData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20]}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#04AA6D',
            color: 'black',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            border: '1px solid #ddd',
            padding: '6px',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#f2f2f2',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#ddd',
          },
        }}
      />
    </Box>
  );
}