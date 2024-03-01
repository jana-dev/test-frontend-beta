import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function PaginationProducts() {
  return (
    <div className='flex justify-center mb-4'>
      < Stack spacing={2} >
        <Pagination count={10} color="primary" />
      </Stack >
    </div >

  );
}