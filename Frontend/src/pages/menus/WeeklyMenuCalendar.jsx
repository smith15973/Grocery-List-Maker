import { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Paper,
    Grid,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Define colors for each meal type
const mealTypeColors = {
    Breakfast: '#FFF9C4',
    Lunch: '#C8E6C9',
    Dinner: '#BBDEFB',
    Snack: '#F8BBD0',
    Dessert: '#D1C4E9',
    empty: '#E0E0E0'
};

// Styles
const calendarContainerStyle = {
    p: 2,
    maxWidth: 1200,
    minWidth: 300,
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
    minWidth: 0,  // Prevent overflow
    overflow: "hidden",
    textOverflow: "ellipsis",
};

const currentDayHeaderStyle = {
    ...dayHeaderStyle,
    bgcolor: "primary.main",
    color: "white",
};

const dayCellStyle = {
    p: 1,
    borderRight: "1px solid",
    borderBottom: "1px solid",
    borderColor: "grey.300",
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,  // Prevent overflow
};

const currentDayStyle = {
    ...dayCellStyle,
    bgcolor: "primary.light",
};

const mealBoxStyle = {
    mb: 1,
    p: 1,
    borderRadius: 1,
    border: '1px solid',
    borderColor: 'grey.300',
    flex: 1,
    display: "flex",
    flexDirection: "column",
};

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

export default function WeeklyMenuCalendar() {
    const [weekOffset, setWeekOffset] = useState(0);
    const [menuData, setMenuData] = useState({});
    const [loading, setLoading] = useState(false);
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    // Calculate week dates
    const startOfCurrentWeek = new Date(currentDate);
    startOfCurrentWeek.setDate(currentDate.getDate() - currentDay);
    const startOfWeek = new Date(startOfCurrentWeek);
    startOfWeek.setDate(startOfCurrentWeek.getDate() + weekOffset * 7);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });

    useEffect(() => {
        const fetchWeeklyData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/menus", {
                    params: {
                        startDate: startOfWeek,
                        endDate: endOfWeek,
                    },
                });

                let organizedData = {};
                response.data.forEach((menu) => {
                    const date = new Date(menu.date);
                    const formattedDate = formatDate(date);
                    organizedData[formattedDate] = menu.meals;
                });

                setMenuData(organizedData);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeeklyData();
    }, [weekOffset]);

    const handlePreviousWeek = () => setWeekOffset((prev) => prev - 1);
    const handleNextWeek = () => setWeekOffset((prev) => prev + 1);

    const isToday = (date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const formatDate = (date) => date.toISOString().split("T")[0];
    
    function filterByMealType(meals, mealType) {
        if (!meals) return [];
        return meals.filter(meal => meal.type === mealType);
    }

    return (
        <Paper elevation={3} sx={calendarContainerStyle}>
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

            <Box>
                <Grid container spacing={0}>
                    {daysOfWeek.map((date, index) => (
                        <Grid item xs={12/7} key={`header-${index}`}>
                            <Box sx={isToday(date) ? currentDayHeaderStyle : dayHeaderStyle}>
                                <Typography 
                                    variant="subtitle1"
                                    noWrap
                                >
                                    {date.toLocaleDateString("en-US", { weekday: "long" })}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    color={isToday(date) ? "white" : "text.secondary"}
                                    noWrap
                                >
                                    {date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={0}>
                    {daysOfWeek.map((date, index) => (
                        <Grid
                            item
                            xs={12/7}
                            key={`cell-${index}`}
                            sx={isToday(date) ? currentDayStyle : dayCellStyle}
                        >
                            {mealTypes.map((mealType) => {
                                const meals = menuData[formatDate(date)]
                                    ? filterByMealType(menuData[formatDate(date)], mealType)
                                    : [];
                                const hasMeals = meals.length > 0;

                                return (
                                    <Box
                                        key={mealType}
                                        sx={{
                                            ...mealBoxStyle,
                                            bgcolor: hasMeals ? mealTypeColors[mealType] : mealTypeColors.empty,
                                        }}
                                    >
                                        <Typography 
                                            variant="subtitle2" 
                                            color="text.secondary"
                                            sx={{ mb: 0.5 }}
                                            noWrap
                                        >
                                            {mealType}
                                        </Typography>
                                        <Typography 
                                            variant="body2"
                                            sx={{ 
                                                wordWrap: "break-word",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {hasMeals ? (
                                                meals.map((meal) => (
                                                    <div key={meal._id}>{meal.main.name}</div>
                                                ))
                                            ) : (
                                                '-'
                                            )}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
}