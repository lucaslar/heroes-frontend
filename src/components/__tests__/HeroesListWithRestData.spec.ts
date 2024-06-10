import { describe, it, expect, vi } from 'vitest'

import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import HeroesListWithRestData from '../HeroesListWithRestData.vue'

describe('HeroesViewWithRestData', () => {
  vi.mock('axios')
  type Hero = { id: number; name: string; affiliation: string; heightInM: number }
  const twoItemsResponse: Hero[] = [
    { id: 1, name: 'R2D2', affiliation: 'Rebellion', heightInM: 1 },
    { id: 2, name: 'C-3PO', affiliation: 'Rebellion', heightInM: 1.7 }
  ]

  it('should display info if list from backend is empty', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: [] })
    const wrapper = shallowMount(HeroesListWithRestData, { props: { title: 'test' } })
    await flushPromises()
    expect(wrapper.text()).toContain('No heroes yet!')
  })

  it('should render list from backend', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: twoItemsResponse })
    const wrapper = shallowMount(HeroesListWithRestData, { props: { title: 'test' } })
    await flushPromises()
    const expectedRows = 1 + twoItemsResponse.length // Headline + one row per item
    expect(wrapper.findAll('tr').length).toBe(expectedRows)
    expect(wrapper.text()).toContain('R2D2')
    expect(wrapper.text()).toContain('C-3PO')
  })
})
