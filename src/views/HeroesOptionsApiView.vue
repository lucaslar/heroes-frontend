<script lang="ts">
import { defineComponent } from 'vue'
import HeroesOptionsApiList from '@/components/HeroesOptionsApiList.vue'

export default defineComponent({
  name: 'HeroesOptionsApiView',
  components: { HeroesOptionsApiList }
})
</script>

<template>
  <main>
    <HeroesOptionsApiList title="Our Heroes ... (Code: Options API)" />
  </main>
</template>

<style scoped></style>
