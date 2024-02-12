<script setup lang="ts">
import Home from './routes/Home.vue';
import { provideAuth } from './modules/auth/useAuth.ts';
import { processAuthenticationOrRedirect } from './modules/auth/auth.ts';

const token = processAuthenticationOrRedirect();
if (token) {
  provideAuth(token);
}
</script>

<template>
  <Home />
</template>

<style scoped></style>
