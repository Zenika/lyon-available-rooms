<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';
import { calendarsIds } from '../calendar/calendars.ts';
import type { Calendars } from '../calendar/calendar.api.ts';
import { getBookingUrl } from '../calendar/calendar.api.ts';

const props = defineProps<{
  calendarName: keyof typeof calendarsIds;
  calendars: Calendars;
}>();

const now = dayjs();

const busyList = computed(() => {
  const calendarId = calendarsIds[props.calendarName];
  return props.calendars?.[calendarId]?.busy;
});

const currentOccupation = computed(() => {
  return busyList.value?.find((busyInfo) => {
    return now.isAfter(dayjs(busyInfo.start)) && now.isBefore(dayjs(busyInfo.end));
  });
});

const nextOccupation = computed(() => {
  const futurOccupation = busyList.value?.filter((busyInfo) => {
    return now.isBefore(dayjs(busyInfo.start));
  });
  if (futurOccupation?.length) {
    return futurOccupation.reduce((sooner, occupation) => {
      if (!sooner) {
        return occupation;
      }
      if (dayjs(sooner.start).isAfter(dayjs(occupation.start))) {
        return occupation;
      }
      return sooner;
    });
  }
});

const isBusy = computed(() => {
  return Boolean(currentOccupation.value);
});

const availableIn = computed(() => {
  if (!currentOccupation.value) {
    return 'Disponible tout de suite';
  }
  const availableInMinutes = dayjs(currentOccupation.value.end).fromNow();

  return `Disponible ${availableInMinutes}`;
});

const nextOccupationIn = computed(() => {
  if (!nextOccupation.value) {
    return '';
  }
  const availableInMinutes = dayjs(nextOccupation.value.start).fromNow();

  return `Occupée ${availableInMinutes}`;
});
</script>

<template>
  <component
    :is="isBusy ? 'div' : 'a'"
    class="room"
    :class="{ busy: isBusy }"
    :href="isBusy ? null : getBookingUrl(calendarsIds[props.calendarName])"
  >
    <slot />
    <p class="small-text" v-if="isBusy">{{ availableIn }}</p>
    <p class="small-text" v-else-if="nextOccupationIn">{{ nextOccupationIn }}</p>
  </component>
</template>

<style scoped>
.room {
  padding: 1.5rem;
  text-decoration: none;
  color: white;
  border-radius: 0.5rem;
  border: 0 solid #e5e7eb;
  background-color: #16a34a;
}

.room.busy {
  background-color: #f43f5e;
}

.small-text {
  font-size: 0.7rem;
  font-style: italic;
  margin-top: 0.5rem;
}
</style>
