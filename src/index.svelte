<svelte:options tag="njv-pagination" />

<script>
  import avatars from "./avatares.json";
</script>

<h2>Pagination</h2>
{#each avatars as avatar}
  <img src={avatar.url} alt="Imagen avatar" />
{/each}

<style>
</style>
