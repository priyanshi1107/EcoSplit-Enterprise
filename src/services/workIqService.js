/**
 * Work IQ Service
 * Simulates contextual data retrieval from Microsoft Work IQ intelligence layer.
 * In production, this queries M365 Graph APIs for calendar events and org structure.
 */

const MOCK_EVENTS = [
  {
    eventId: "M365-EVT-88291",
    subject: "Architecture Strategy Offsite Dinner",
    start: "2026-06-14T19:00:00Z",
    end: "2026-06-14T22:00:00Z",
    attendees: [
      "priyanshi@company.com",
      "aayush@company.com",
      "manager@company.com"
    ]
  },
  {
    eventId: "M365-EVT-90112",
    subject: "Q2 Sprint Retro Lunch",
    start: "2026-06-13T12:00:00Z",
    end: "2026-06-13T13:30:00Z",
    attendees: [
      "priyanshi@company.com",
      "dev1@company.com",
      "dev2@company.com",
      "lead@company.com"
    ]
  }
];

class WorkIqService {
  async resolveTeamContext(userId, receiptTimestamp) {
    console.log(`[Work IQ] Querying context for user=${userId} near ${receiptTimestamp}`);

    const receiptTime = new Date(receiptTimestamp).getTime();
    const match = MOCK_EVENTS.find(evt => {
      const start = new Date(evt.start).getTime();
      const end = new Date(evt.end).getTime();
      return receiptTime >= start && receiptTime <= end && evt.attendees.includes(userId);
    });

    if (!match) {
      return { eventId: null, meetingSubject: null, detectedAttendees: [userId], confidenceScore: 0.3, dataBoundary: "Internal-Enterprise-Only" };
    }

    return {
      eventId: match.eventId,
      meetingSubject: match.subject,
      detectedAttendees: match.attendees,
      confidenceScore: 0.98,
      dataBoundary: "Internal-Enterprise-Only"
    };
  }
}

module.exports = new WorkIqService();
