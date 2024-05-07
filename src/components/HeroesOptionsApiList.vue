<script lang="ts">
import { defineComponent } from 'vue'

type Hero = { id: number; name: string }
type HeroesListOaData = {
  heroes: Hero[]
  nameField: string
  currentId: number
}

export default defineComponent({
  name: 'HeroesOptionsApiList',
  props: ['title'],
  data(): HeroesListOaData {
    return {
      nameField: '',
      currentId: 1,
      heroes: []
    }
  },
  methods: {
    initHeroes(): void {
      this.addHero('Han Solo')
      this.addHero('Chewbacca')
    },
    addHero(name: string): void {
      this.heroes.push({ name, id: this.currentId++ })
    },
    onFormSubmitted(): void {
      this.addHero(this.nameField.valueOf())
    },
    removeHero(id: number): void {
      this.heroes = this.heroes.filter((h) => h.id !== id)
    }
  },
  mounted() {
    this.initHeroes()
  }
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
      <td colspan="3">No heroes yet!</td>
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
