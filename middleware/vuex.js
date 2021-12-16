export default async ({ store }) => {
  await store.dispatch('topojson/fetchMaps')
}
