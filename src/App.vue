<script setup lang="ts">
import { provideAuth } from './modules/auth/useAuth.ts';
import { doAuthentication } from './modules/auth/auth.ts';

const token = doAuthentication();

if (token) {
  provideAuth(token);
}
</script>

<template>
  <router-view />
</template>

<style scoped></style>
