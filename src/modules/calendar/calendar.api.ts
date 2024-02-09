import { calendarsIds } from './calendars.ts';
import dayjs from 'dayjs';

export type Calendars = Record<string, { busy: Array<{ end: string; start: string }> }>;

export type FreeBusyResponse = {
  calendars: Calendars;
  kind: string;
  timeMax: string;
  timeMin: string;
};
export async function getFreeBusy(token: string, timeMin: string, timeMax: string): Promise<FreeBusyResponse> {
  const body = {
    timeMin,
    timeMax,
    items: Object.values(calendarsIds).map((id) => ({ id })),
  };

  const response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.json();
}

export function getBookingUrl(roomId: string): string {
  const title = 'Réservation+Rapide';
  const start = dayjs().startOf('hour').format('YYYYMMDDTHHmmss');
  const end = dayjs().startOf('hour').add(1, 'hour').format('YYYYMMDDTHHmmss');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&add=${roomId}`;
}
