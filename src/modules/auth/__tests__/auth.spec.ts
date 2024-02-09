import { describe, it, expect, beforeEach, vi } from 'vitest';

import { getAuthenticationUrl, parseAuthentication, doAuthentication } from '../auth.ts';

describe('auth.ts', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.location = {
      ...window.location,
      assign: vi.fn(),
    };
    vi.spyOn(window.location, 'assign');
  });

  describe('getAuthenticationUrl', () => {
    it('should build the correct URL', () => {
      const url = new URL(getAuthenticationUrl());
      expect(url.origin).toEqual('https://accounts.google.com');
      expect(url.pathname).toEqual('/o/oauth2/v2/auth');
      expect(url.searchParams.get('scope')).toEqual('https://www.googleapis.com/auth/calendar.readonly');
      expect(url.searchParams.get('include_granted_scopes')).toEqual('true');
      expect(url.searchParams.get('response_type')).toEqual('token');
      expect(url.searchParams.get('state')).toEqual('state_parameter_passthrough_value');
      expect(url.searchParams.get('redirect_uri')).toEqual('http://localhost:5173/token');
      expect(url.searchParams.get('client_id')).toEqual(
        '258923833211-fvmu2aq8edsogdlun6b5jv718sl2le6f.apps.googleusercontent.com',
      );
    });
  });

  describe('parseAuthentication', () => {
    it('should store token from URL', () => {
      const token =
        'ya29.a0AfB_byBE6dTpnBMQdygmoAijLzG0xJAWQn1WbK193IVEtH1olZn1PnStlMjS85wjonrHVjkauMLpF9sXzwEg3X4X_7rOa0SZWrU8MLTt_oQ10p4CXQB8JImF-PHHam1kH2B6pd1x6Ddyc2_JOrh-G225K10DB94GrlEHaCgYKAdMSARMSFQHGX2MiXh2miYQzSFDwUTOxstfoFw0171';
      const value = parseAuthentication(
        `state=state_parameter_passthrough_value&access_token=${token}&token_type=Bearer&expires_in=3599&scope=https://www.googleapis.com/auth/calendar.readonly`,
      );

      expect(sessionStorage.getItem('auth.token')).toEqual(token);
      expect(value).toEqual(token);
    });
  });

  describe('doAuthentication', () => {
    it('should redirect to google auth if there no authentication', () => {
      const response = doAuthentication();
      expect(response).toBeNull();
      expect(window.location.assign).toBeCalledWith(getAuthenticationUrl());
    });
  });
});
