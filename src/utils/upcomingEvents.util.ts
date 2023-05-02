import { IReminder } from '../interfaces/reminder.interface';

function upcomingEvents(events: IReminder[], eventsNumber: number): IReminder[] {
    const sortedEvents = events.slice().sort(function(a, b) {
        return new Date(a.birth_date).getTime() - new Date(b.birth_date).getTime();
    });
      
    const upcomingObjects = sortedEvents.filter((_, index) => {
        return index < eventsNumber;
    });
    return upcomingObjects;
}

export default upcomingEvents;