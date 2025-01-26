import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Box,
} from '@mui/material';

const FilterableTable = ({ data }) => {
  const [filters, setFilters] = useState({ city: '', country: '' });

  const filteredData = data.filter((item) =>
    (filters.city ? item.city.includes(filters.city) : true) &&
    (filters.country ? item.country.includes(filters.country) : true)
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Filter by City"
          variant="outlined"
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
        <TextField
          label="Filter by Country"
          variant="outlined"
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Applicant Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Loan Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default FilterableTable;
