const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const LOCAL_STORAGE_KEY = 'auth.token';

export function getAuthenticationUrl() {
  const params = new URLSearchParams();
  params.set('scope', SCOPES);
  params.set('include_granted_scopes', 'true');
  params.set('response_type', 'token');
  params.set('state', 'state_parameter_passthrough_value');
  params.set('redirect_uri', REDIRECT_URI);
  params.set('client_id', CLIENT_ID);

  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export function parseAuthentication(authenticationParams: string): string | null {
  const authentication = new URLSearchParams(authenticationParams);
  return authentication.get('access_token');
}

export function storeAuthentication(token: string) {
  if (token) {
    sessionStorage.setItem(LOCAL_STORAGE_KEY, token);
  }
}

export function processAuthenticationOrRedirect(): string | void {
  // Check if there was a token in URL
  const tokenInUrl = parseAuthentication(window.location.hash.slice(1));
  if (tokenInUrl) {
    storeAuthentication(tokenInUrl);
    return tokenInUrl;
  }

  // Otherwise check if there is token already stored
  const storedToken = sessionStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedToken) {
    return storedToken;
  }

  // Otherwise redirect to authentication
  window.location.assign(getAuthenticationUrl());
}
