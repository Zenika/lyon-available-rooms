import { describe, it, expect, vi } from 'vitest';
import { getBookingUrl } from '../calendar.api.ts';

describe('calendar.api', () => {
  describe('getBookingUrl', () => {
    it('should get the calendar link for the current hour', () => {
      vi.setSystemTime(new Date('2024-02-01 11:12'))

      console.log(getBookingUrl, typeof getBookingUrl);
      const bookingUrl = getBookingUrl('some-calendar-id');

      const url = new URL(bookingUrl);
      expect(url.origin).toEqual('https://calendar.google.com');
      expect(url.pathname).toEqual('/calendar/render');
      expect(url.searchParams.get('action')).toEqual('TEMPLATE');
      expect(url.searchParams.get('text')).toEqual('Réservation Rapide');
      expect(url.searchParams.get('dates')).toEqual('20240201T110000/20240201T120000');
      expect(url.searchParams.get('add')).toEqual('some-calendar-id');
    });
  });
});
