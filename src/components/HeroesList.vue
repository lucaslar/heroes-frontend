<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

defineProps<{ title: string }>()

type Hero = { id: number; name: string }

const heroes: Ref<Hero[]> = ref([])
const nameField = ref('')
let currentId = 1

function initHeroes(): void {
  addHero('C-3PO')
  addHero('R2D2')
}

function addHero(name: string): void {
  heroes.value.push({ name, id: currentId++ })
}

function onFormSubmitted(): void {
  addHero(nameField.value)
}

function removeHero(id: number): void {
  heroes.value = heroes.value.filter((h) => h.id !== id)
}

// Lifecycle Hook
onMounted(() => {
  initHeroes()
})
</script>

<template>
  <h2>{{ title }}</h2>
  <form @submit="onFormSubmitted()" @submit.prevent>
    <!-- "@submit.prevent" prevents a page refresh after submitting form -->
    <input type="text" placeholder="Name" v-model="nameField" />
    <button>Add Hero</button>
  </form>
  <hr />
  <table>
    <tr>
      <th>Delete</th>
      <th>Name</th>
      <th>ID</th>
    </tr>
    <tr v-if="!heroes.length">
      <td colspan="2">No heroes yet!</td>
    </tr>
    <tr v-for="hero in heroes" :key="hero.id">
      <td>
        <button @click="removeHero(hero.id)" class="delete">delete</button>
      </td>
      <td>{{ hero.name }}</td>
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
