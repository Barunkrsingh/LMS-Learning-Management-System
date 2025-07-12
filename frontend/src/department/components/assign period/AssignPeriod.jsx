import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../environment';

const AssignPeriod = () => {
  const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([])
  const [teacher, setTeacher] = useState('');
  const [subject, setSubject] = useState('');
  const [semesterId, setSemesterId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    // Fetch teachers and semester
    const fetchData = async () => {
      const teacherResponse = await axios.get(`${baseUrl}/teacher/fetch-with-query`,{params:{}});
      const semesterResponse = await axios.get(`${baseUrl}/semester/fetch-all`);
      const subjectResponse = await axios.get(`${baseUrl}/subject/fetch-all`,{params:{}})
      setSubjects(subjectResponse.data.data)
      setTeachers(teacherResponse.data.data);
      setSemesters(classResponse.data.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/period/create`, {
        teacher,
        subject,
        semesterId,
        startTime,
        endTime,
      });
      alert('Period assigned successfully');
    } catch (error) {
      console.error('Error assigning period:', error);
    }
  };

  return (
    <Container>
      <h2>Assign Period to Teacher</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Teacher</InputLabel>
          <Select value={teacher} onChange={(e) => setTeacher(e.target.value)} required>
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>{teacher.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <TextField label="Subject" fullWidth value={subject} onChange={(e) => setSubject(e.target.value)} required /> */}

        <FormControl fullWidth margin="normal">
          <InputLabel>Subject</InputLabel>
          <Select value={subject} onChange={(e) => setSubject(e.target.value)} required>
            {subjects.map((sbj) => (
              <MenuItem key={sbj._id} value={sbj._id}>{sbj.subject_name}</MenuItem>
            ))}
          </Select>
        </FormControl>


        <FormControl fullWidth margin="normal">
          <InputLabel>Semester</InputLabel>
          <Select value={semesterId} onChange={(e) => setSemesterId(e.target.value)} required>
            {semesters.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>{cls.semester_text}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Start Time"
          type="datetime-local"
          fullWidth
          // InputLabelProps={{ shrink: true }}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <TextField
          label="End Time"
          type="datetime-local"
          fullWidth
          // InputLabelProps={{ shrink: true }}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Assign Period
        </Button>
      </form>
    </Container>
  );
};

export default AssignPeriod;
