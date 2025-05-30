import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStaff, setSelectedStaff] = useState('');
  const [attendance, setAttendance] = useState([]);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };

  const markAttendance = (staffId, status) => {
    const newAttendance = {
      id: Date.now(),
      staffId,
      date: selectedDate,
      status,
      timestamp: new Date(),
    };
    setAttendance(prev => [...prev, newAttendance]);
  };

  const getAttendanceStatus = (staffId) => {
    const record = attendance.find(
      a => a.staffId === staffId && 
      a.date.toDateString() === selectedDate.toDateString()
    );
    return record ? record.status : null;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Attendance Management</Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Filter by Staff</InputLabel>
            <Select
              value={selectedStaff}
              onChange={handleStaffChange}
              label="Filter by Staff"
            >
              <MenuItem value="">All Staff</MenuItem>
              <MenuItem value="1">John Doe</MenuItem>
              <MenuItem value="2">Jane Smith</MenuItem>
              <MenuItem value="3">Mike Johnson</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Staff Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { id: '1', name: 'John Doe' },
              { id: '2', name: 'Jane Smith' },
              { id: '3', name: 'Mike Johnson' },
            ]
              .filter(staff => !selectedStaff || staff.id === selectedStaff)
              .map((staff) => {
                const status = getAttendanceStatus(staff.id);
                return (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{selectedDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      {status ? (
                        <Typography
                          color={status === 'present' ? 'success.main' : 'error.main'}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Typography>
                      ) : (
                        'Not Marked'
                      )}
                    </TableCell>
                    <TableCell>
                      {!status && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => markAttendance(staff.id, 'present')}
                          >
                            Present
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => markAttendance(staff.id, 'absent')}
                          >
                            Absent
                          </Button>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Attendance; 