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

  const token = authentication.get('access_token');

  if (token) {
    sessionStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  return token;
}

export function doAuthentication(): string | null {
  const storedToken = sessionStorage.getItem(LOCAL_STORAGE_KEY);

  console.log(storedToken);

  if (!storedToken) {
    window.location.assign(getAuthenticationUrl());
    return null;
  }

  return storedToken;
}
