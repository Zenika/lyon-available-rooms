import { describe, it, expect } from 'vitest';
import { getBookingUrl } from "../calendar.api.ts"

describe('calendar.api', () => {
    describe('getBookingUrl', () => {
        it('should get the calendar link for the current hour', () => {
            // vi.useFakeTimers().setSystemTime(new Date('2024-02-01 11:00'))

            console.log(getBookingUrl, typeof getBookingUrl)
            const bookingUrl = getBookingUrl('some-calendar-id');

            expect(bookingUrl).toEqual('')
        });
    });
});
