/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  Container,
  Typography,
} from "@mui/material";
import { baseUrl } from "../../../environment";

const localizer = momentLocalizer(moment);

const ScheduleStudent = () => {
  const [events, setEvents] = useState([]);
  const [allSemesters, setAllSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const getStudentDetails = () => {
    axios.get(`${baseUrl}/student/fetch-own`).then(resp=>{
        // setStudent(resp.data.data)
        setSelectedSemester({
          id: resp.data.data.student_semester._id,
          semester: resp.data.data.student_semester.semester_text,
        });
        console.log("student", resp);
      })
      .catch((e) => {
        console.log("Error in student", e);
      });
  };

  useEffect(() => {
    getStudentDetails();
  }, []);

  // Fetch periods for the selected semester
  useEffect(() => {
    const fetchSemesterPeriods = async () => {
      if (!selectedSemester) return;
      try {
        const response = await axios.get(
          `${baseUrl}/period/semester/${selectedSemester.id}`
        );
        const periods = response.data.periods;
        const eventsData = periods.map((period) => ({
          id: period._id,
          title: `${period.subject.subject_name} By ${period.teacher.name}`,
          start: new Date(period.startTime),
          end: new Date(period.endTime),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching periods:", error);
      }
    };
    if (selectedSemester) {
      fetchSemesterPeriods();
    }
  }, [selectedSemester]);

  return (
    <Container>
      <h2>
        Your Weekly Schedule [Semester : {selectedSemester && selectedSemester.semester}]{" "}
      </h2>

      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["week"]}
        step={30}
        timeslots={1}
        min={new Date(1970, 1, 1, 10, 0, 0)}
        startAccessor="start"
        endAccessor="end"
        max={new Date(1970, 1, 1, 17, 0, 0)}
        defaultDate={new Date()}
        showMultiDayTimes
        style={{ height: "100%", width: "100%" }}
        formats={{ timeGutterFormat: "hh:mm A" }}
      />
    </Container>
  );
};

export default ScheduleStudent;
