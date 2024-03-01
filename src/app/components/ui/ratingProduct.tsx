import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

interface Rating{
    rating: number;
}

export default function HalfRating({rating}: Rating) {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
    </Stack>
  );
}