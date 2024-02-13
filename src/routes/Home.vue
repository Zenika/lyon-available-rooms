<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../modules/auth/useAuth.ts';
import { onMounted } from 'vue';
import { getFreeBusy, FreeBusyResponse } from '../modules/calendar/calendar.api.ts';
import dayjs from 'dayjs';
import Room from '../modules/room/Room.vue';

const token = useAuth();
const data = ref<FreeBusyResponse>();

onMounted(async () => {
  if (token) {
    const start = dayjs().startOf('day');
    const end = dayjs().endOf('day');
    data.value = await getFreeBusy(token, start.toISOString(), end.toISOString());
  }
});
</script>

<template>
  <div class="container" v-if="data">
    <h1>Salles de Lyon</h1>
    <section>
      <h2>Premier étage</h2>
      <ul class="rooms-list">
        <li>
          <room class="grain-de-sable" :calendars="data?.calendars" calendar-name="graindesable">
            <p>Grain de sable <span class="surname">(La salle de sieste)</span></p>
          </room>
        </li>
      </ul>
    </section>
    <section>
      <h2>RDC</h2>
      <ul class="rooms-list">
        <li>
          <room class="californication" :calendars="data?.calendars" calendar-name="californication">
            <p>Californication <span class="surname">(La salle à côté des toilettes)</span></p>
          </room>
        </li>
        <li>
          <room class="tetra" :calendars="data?.calendars" calendar-name="tetra">
            <p>Tetra <span class="surname">(Le salle des bureaux debout)</span></p>
          </room>
        </li>
        <li>
          <room class="ram" :calendars="data?.calendars" calendar-name="ram">
            <p>RAM <span class="surname">(La salle de la grande TV qui marche jamais)</span></p>
          </room>
        </li>
        <li>
          <room class="nevermind" :calendars="data?.calendars" calendar-name="nevermind">
            <p>Nevermind <span class="surname">(Le bocal derrière Betty)</span></p>
          </room>
        </li>
        <li>
          <room class="thewall" :calendars="data?.calendars" calendar-name="thewall">
            <p>The Wall <span class="surname">(Le frigo/Le four)</span></p>
          </room>
        </li>
      </ul>
    </section>
    <section>
      <h2>Sous sol</h2>
      <ul class="rooms-list">
        <li>
          <room class="zenikave" :calendars="data?.calendars" calendar-name="zenikave">
            <p>Zenikave <span class="surname">(Là où il y a le baby)</span></p>
          </room>
        </li>
        <li>
          <room class="feelinggood" :calendars="data?.calendars" calendar-name="feelingGood">
            <p>Feeling Good <span class="surname">(Le bocal mais en bas)</span></p>
          </room>
        </li>
      </ul>
    </section>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  text-align: center;
}

h2 {
  font-size: 1.15rem;
  line-height: 1;
}

.container {
  max-width: 900px;
  margin: auto;

  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  gap: 3rem;
  --item-size: 75px;
}

.rooms-list {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

@media screen and (min-width: 900px) {
  .rooms-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.rooms-list li {
  display: flex;
}

.rooms-list .room {
  width: 100%;
}

.surname {
  font-size: 0.8rem;
}
</style>
