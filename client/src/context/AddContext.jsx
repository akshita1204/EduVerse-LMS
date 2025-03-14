import { createContext, useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import PropTypes from "prop-types"; 
import {useAuth,useUser} from '@clerk/clerk-react'

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const {getToken}=useAuth()
    const {user}=useUser()

    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // Fetch all courses
    useEffect(() => {
        setAllCourses(dummyCourses);
        setEnrolledCourses(dummyCourses);
    }, []);

    const logToken=async()=>
    {
        console.log(await getToken())
    }
    useEffect(() => {
        if(user)
        {
            logToken()
        }
    }, [user]);

    // Calculate rating
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) return 0;
        return course.courseRatings.reduce((sum, rating) => sum + rating.rating, 0) / course.courseRatings.length;
    };

    // Calculate chapter time
    const calculateChapterTime = (chapter) =>
        humanizeDuration(
            chapter.chapterContent.reduce((time, lecture) => time + lecture.lectureDuration, 0) * 60 * 1000,
            { units: ["h", "m"] }
        );

    // Calculate course duration
    const calculateCourseDuration = (course) =>
        humanizeDuration(
            course.courseContent.reduce(
                (time, chapter) => time + chapter.chapterContent.reduce((t, lecture) => t + lecture.lectureDuration, 0),
                0
            ) * 60 * 1000,
            { units: ["h", "m"] }
        );

    // Calculate number of lectures
    const calculateNumberofLectures = (course) =>
        course.courseContent.reduce(
            (total, chapter) => total + (Array.isArray(chapter.chapterContent) ? chapter.chapterContent.length : 0),
            0
        );

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNumberofLectures,
        enrolledCourses,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ✅ Add PropTypes Validation
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
