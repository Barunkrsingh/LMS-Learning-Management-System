/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import {
  FormControl,
  MenuItem,
  Paper,
  Container,
  Typography,
  Select,
} from '@mui/material';
import { baseUrl } from '../../../environment';

const localizer = momentLocalizer(moment);

const eventStyleGetter = (event) => {
  const style = {
    backgroundColor: event.bgColor || '#3174ad',
    color: 'white',
    borderRadius: '4px',
    padding: '5px',
    border: 'none',
  };
  return {
    style,
  };
};

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [allSemesters, setAllSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);

  // Fetch all semesters
  const fetchAllSemesters = () => {
    axios
      .get(`${baseUrl}/semester/fetch-all`)
      .then((resp) => {
        setAllSemesters(resp.data.data);
        setSelectedSemester(resp.data.data[0]._id);
      })
      .catch((e) => {
        console.error('Error in fetching all Semesters');
      });
  };

  useEffect(() => {
    fetchAllSemesters();
  }, []);

  // Fetch periods for the selected semester
  useEffect(() => {
    const fetchSemesterPeriods = async () => {
      if (!selectedSemester) return;
      try {
        const response = await axios.get(`${baseUrl}/period/semester/${selectedSemester}`);
        const periods = response.data.periods;
        const eventsData = periods.map((period) => ({
          id: period._id,
          title: `${period.subject.subject_name} By ${period.teacher.name}`,
          start: new Date(period.startTime),
          end: new Date(period.endTime),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };

    fetchSemesterPeriods();
  }, [selectedSemester]);

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  return (
    <Container>
      <h2>Weekly Schedule</h2>

      <Paper sx={{ margin: '10px', padding: '10px' }}>
        <FormControl sx={{ minWidth: '220px', marginTop: '10px' }}>
          <Typography>Change Semester</Typography>
          <Select value={selectedSemester} onChange={handleSemesterChange}>
            {allSemesters &&
              allSemesters.map((value) => (
                <MenuItem key={value._id} value={value._id}>
                  {value.semester_text}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Paper>

      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={['week']}
        step={30}
        timeslots={1}
        min={new Date(1970, 1, 1, 10, 0, 0)}
        startAccessor="start"
        endAccessor="end"
        max={new Date(1970, 1, 1, 17, 0, 0)}
        defaultDate={new Date()}
        showMultiDayTimes
        style={{ height: '100%', width: '100%' }}
        formats={{ timeGutterFormat: 'hh:mm A' }}
        eventPropGetter={eventStyleGetter}
      />
    </Container>
  );
};

export default Schedule;
