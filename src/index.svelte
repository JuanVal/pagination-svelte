<svelte:options tag="njv-pagination" />

<script>
  import avatares from "./avatares.json";
  let primeraPagina = 1;
  let maxAvatarsPerPage = 4;
  const totalPages = (payload) => Math.ceil(payload.length / maxAvatarsPerPage);

  console.log(avatares.data.slice(primeraPagina - 1, maxAvatarsPerPage));
  const nextPage = () => {
    primeraPagina += primeraPagina;
    maxAvatarsPerPage = maxAvatarsPerPage * 2;
    console.log(totalPages(avatares.data));

    console.log(primeraPagina, maxAvatarsPerPage);
  };
</script>

<h2>Pagination</h2>
{#if avatares.status === 200}
  {#each avatares.data as avatar}
    <img src={avatar.url} alt="Imagen avatar" width="32" />
  {/each}
{/if}
<button on:click={nextPage}>Next</button>

<style>
</style>
