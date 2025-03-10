import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Styles
const calendarContainerStyle = {
  p: 2,
  maxWidth: 1200,
  margin: "0 auto",
};

const headerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

const dayHeaderStyle = {
  bgcolor: "grey.100",
  p: 1,
  textAlign: "center",
  borderBottom: "1px solid",
  borderColor: "grey.300",
};

const dayCellStyle = {
  p: 2,
  borderRight: "1px solid",
  borderBottom: "1px solid",
  borderColor: "grey.300",
  minHeight: 200,
};

const currentDayStyle = {
  ...dayCellStyle,
  bgcolor: "primary.light",
};

// Meal types for display
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

export default function WeeklyMenuCalendar() {
  const [weekOffset, setWeekOffset] = useState(0);
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  // Calculate start of current week
  const startOfCurrentWeek = new Date(currentDate);
  startOfCurrentWeek.setDate(currentDate.getDate() - currentDay);

  // Apply week offset
  const startOfWeek = new Date(startOfCurrentWeek);
  startOfWeek.setDate(startOfCurrentWeek.getDate() + weekOffset * 7);

  // Generate days of the week
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const handlePreviousWeek = () => {
    setWeekOffset((prev) => prev - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset((prev) => prev + 1);
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <Paper elevation={3} sx={calendarContainerStyle}>
      {/* Navigation Header */}
      <Box sx={headerContainerStyle}>
        <IconButton onClick={handlePreviousWeek} aria-label="previous week">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">
          Week of{" "}
          {startOfWeek.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={handleNextWeek} aria-label="next week">
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      {/* Calendar Grid */}
      <Box>
        {/* Day Headers Row */}
        <Grid container>
          {daysOfWeek.map((date, index) => (
            <Grid item xs key={`header-${index}`}>
              <Box sx={dayHeaderStyle}>
                <Typography variant="subtitle1">
                  {date.toLocaleDateString("en-US", { weekday: "long" })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Day Content Row */}
        <Grid container>
          {daysOfWeek.map((date, index) => (
            <Grid
              item
              xs
              key={`cell-${index}`}
              sx={isToday(date) ? currentDayStyle : dayCellStyle}
            >
              {mealTypes.map((mealType) => (
                <Box
                  key={mealType}
                  sx={{
                    mb: 1,
                    p: 1,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    {mealType}
                  </Typography>
                  <Typography variant="body2">
                    [Placeholder for {mealType}]
                  </Typography>
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}