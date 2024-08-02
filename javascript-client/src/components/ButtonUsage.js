import * as React from 'react';
import Button from '@mui/material/Button/index.js';

export default function ButtonUsage({message}) {
  return <Button variant="contained">{message}</Button>;
}