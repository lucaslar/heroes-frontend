<script setup lang="ts">
import { onMounted, ref, type Ref} from 'vue'
import axios from 'axios'

defineProps<{ title: string }>()

type Hero = { id: number; name: string; affiliation: string; heightInM: number }

const heroes: Ref<Hero[]> = ref([])
const nameField = ref('')
const affiliationField = ref('')
const heightField = ref()

const url = import.meta.env.VITE_APP_BACKEND_BASE_URL

function createHero(): void {
  const hero = {
    name: nameField.value,
    affiliation: affiliationField.value,
    heightInM: heightField.value
  }

  axios
    .post<Hero>(`${url}/hero`, hero)
    .then((response) => heroes.value.push(response.data))
    .catch((error) => console.log(error))
}

function requestHeroes(): void {
  axios
    .get<Hero[]>(`${url}/hero`)
    .then((response) => (heroes.value = response.data))
    .catch((error) => console.log(error))
}

function removeHero(id: number): void {
  axios
    .delete<void>(`${url}/hero/${id}`)
    .then(() => (heroes.value = heroes.value.filter((h) => h.id !== id)))
    .catch((error) => console.log(error))
}

// Lifecycle Hook
onMounted(() => requestHeroes())
</script>

<template>
  <h2>{{ title }}</h2>
  <form @submit="createHero()" @submit.prevent>
    <!-- "@submit.prevent" prevents a page refresh after submitting form -->
    <input type="text" placeholder="Name" v-model="nameField" />
    <input type="text" placeholder="Affiliation" v-model="affiliationField" />
    <input type="number" placeholder="Height" v-model="heightField" />
    <button>Add Hero</button>
  </form>
  <hr />
  <table>
    <tr>
      <th>Delete</th>
      <th>Name</th>
      <th>Affiliation</th>
      <th>height in M</th>
      <th>ID</th>
    </tr>
    <tr v-if="!heroes.length">
      <td colspan="4">No heroes yet!</td>
    </tr>
    <tr v-for="hero in heroes" :key="hero.id">
      <td>
        <button @click="removeHero(hero.id)" class="delete">delete</button>
      </td>
      <td>{{ hero.name }}</td>
      <td>{{ hero.affiliation }}</td>
      <td>{{ hero.heightInM }}</td>
      <td>({{ hero.id }})</td>
    </tr>
  </table>
</template>

<style scoped>
form {
  display: flex;
  margin: 0 -16px;

  * {
    margin: 16px;
  }

  input {
    flex-grow: 1;
  }
}

table {
  margin: 8px -8px 0;

  th,
  td {
    padding: 8px;
  }
}

button {
  border-radius: 48px;
  padding: 8px;
  border: none;
  cursor: pointer;

  &.delete {
    background: darkred;
    color: white;
  }
}
</style>
