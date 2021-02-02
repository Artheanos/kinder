import React, {useEffect, useState} from "react";
import EventList from "../home/right/list/EventList";
import {KINDER_BACK_URL} from "../../common/util";

const MyEvents: React.FC = () => {
    const [myEvents, setMyEvents] = useState<Kinder.EventResponseObject[]>([]);

    useEffect(() => {
        fetch(`${KINDER_BACK_URL}/event/my`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            res.text().then(val => {
                let jsonData: Kinder.EventResponseObject[] = JSON.parse(val);
                setMyEvents(jsonData);
            })
        })
    }, []);

    return (
        <div>
            <EventList eventList={myEvents}/>
        </div>
    )
}
export default MyEvents

