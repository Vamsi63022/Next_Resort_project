"use client";
import React, { useState } from 'react'
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const CalenderComponent = ({onDatesSelect}) => {
    const[showCalender,setShowCalender] = useState(false)
    const[date,setDate] = useState ([ {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [selectedDates,setSelectedDates] = useState(null)

  const startDate = date[0].startDate.toLocaleDateString("en-GB");
  const endDate = date[0].endDate.toLocaleDateString("en-GB");
  const handleSelectDates = async()=>{
    
    setSelectedDates(`Selcted Dates:${startDate} - ${endDate}`)
    setShowCalender(false)
    const bookingDates = {startDate,endDate}
    onDatesSelect(bookingDates);
    console.log("Selected Dates from calender:",bookingDates);
    
    
  }
  return (
      <div className='calenderSection'>
        <div className='currentDate' onClick={()=>setShowCalender(!showCalender)}>
         {! selectedDates && (
            <>
            {`${startDate} - ${endDate}`} 
            </>

         )}
         {selectedDates && (
           <div className="" style={{color:'red'}}>
                {selectedDates}
            </div>
         )}

        </div>
    {showCalender && 
    <DateRange
  editableDateInputs={true}
  onChange={item => setDate([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={date} className='dateRange'
/>}
    <button onClick={ handleSelectDates} className='calenderButton'>Select Dates</button>
    </div>
  )
}

export default CalenderComponent