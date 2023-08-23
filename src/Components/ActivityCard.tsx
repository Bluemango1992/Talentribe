import { useState } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import { Button, HeaderCard, Paper } from '../Components';
import { Caption, H6, P2, H4 } from '../Typography';


const ActivityCard = () => {
    
    const data = [
        {
            activityID : 1,
            userID : "John Doe",
            action : "Shortlist confirmed",
            date : "2023-08-15 21:10:41"
        },
        {
            activityID : 2,
            userID : "John Doe",
            action : "Note Added",
            date : "2023-08-15 21:10:41"
        },
        {
            activityID : 3,
            userID : "John Doe",
            action : "Cv Sent",
            date : "2023-08-15 21:10:41"
        },
        {
            activityID : 4,
            userID : "Jane Smith",
            action : "Interview confirmed",
            date : "2023-08-15 21:10:41"
        },
        {
            activityID : 5,
            userID : "John Doe",
            action : "Offer confirmed",
            date : "2023-08-15 21:10:41"
        },
        {
            activityID : 6,
            userID : "John Doe",
            action : "Placement confirmed",
            date : "2023-08-15 21:10:41"
        },
        {
            activityID : 7,
            userID : "John Doe",
            action : "Shortlist confirmed",
            date : "2023-08-15 21:10:41"
        },
        

    ];

    const ITEMS_PER_SECTION = 5;

    const [currentIndex, setCurrentIndex] = useState(0);  // Initial index

    const handleNext = () => {
        if (currentIndex + ITEMS_PER_SECTION < data.length) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <Paper>
            <div className="flex flex-col h-full min-w-[400px]">
            <HeaderCard heading='Activity' showIcon={false} />
                <div className="flex flex-col items-center justify-between w-full p-4">
                {data.slice(currentIndex, currentIndex + ITEMS_PER_SECTION).map((activity, index) => (
                    <div key={activity.activityID} className="flex items-start gap-4 rounded-full w-full mb-4">
                        <div className="w-8 h-8 flex justify-center items-center rounded-md bg-slate-100">{currentIndex + index + 1}</div>
                        <div className="flex flex-col min-w-max">
                            <H6>{activity.userID}</H6>
                            <P2>{activity.action}</P2>
                            <Caption>{activity.date}</Caption>
                        </div>
                    </div>
                ))}
                </div>
                <div className="flex justify-center items-center gap-4">
                <Button variant="tertiary" size="small" onClick={handlePrevious} disabled={currentIndex === 0}><FaArrowAltCircleUp color={currentIndex === 0 ? 'grey' : '#008b8b'} size={24} /></Button>
                <Button variant="tertiary" size="small" onClick={handleNext} disabled={currentIndex + ITEMS_PER_SECTION >= data.length}><FaArrowAltCircleDown color={currentIndex + ITEMS_PER_SECTION >= data.length ? 'grey' : '#008b8b'} size={24} /></Button>
                </div>
            </div>
        </Paper>
    );
};

export default ActivityCard;