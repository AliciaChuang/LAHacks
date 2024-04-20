import React, { useState, createContext, useEffect } from "react";

export const EventMarkersContext = createContext({
  eventMarkers: [], fetchEventMarkers: () => {}
});

export function EventMarkersProvider(props) {
  const [eventMarkers, setEventMarkers] = useState([])
  
  const fetchEventMarkers = async () => {
    const response = await fetch("http://127.0.0.1:8000/events")
    const eventMarkersData = await response.json()
    setEventMarkers(eventMarkersData["data"])
  }

  useEffect(() => {
    fetchEventMarkers()
  }, [])

  return (
    <EventMarkersContext.Provider value={{ eventMarkers, fetchEventMarkers }}>
      {props.children}
    </EventMarkersContext.Provider>
  );
}