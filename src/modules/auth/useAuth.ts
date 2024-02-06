import { inject, provide } from 'vue';

export const provideAuth = (token: string | null) => {
  provide('authentication', token);
};

export const useAuth = (): string | null | undefined => {
  return inject('authentication');
};
