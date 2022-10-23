<svelte:options tag="njv-pagination" />

<script>
  import { onMounted } from "svelte";
  // import avatares from "./avatares.json";

  let resultEventos = [];
  let eventos = [];
  let primeraPagina = 1;
  let maxAvatarsPerPage = 4;
  let ocultar = false;
  let ocultarNext = false;
  let totalPages = 0;
  const getEventsFromApiGolofGol = async () => {
    const query = await fetch(
      `https://us-central1-appgoldeoro.cloudfunctions.net/api/avatares`,
      {
        method: "GET",
        headers: {
          contentType: "application/json",
        },
      }
    );
    const resultQuery = await query.json();
    if (resultQuery.status) {
      eventos = [];
      resultQuery.data.forEach((element) => {
        console.log(element);
        eventos = [...eventos, element];
      });
      totalPages = Math.ceil(eventos.length / maxAvatarsPerPage);
    }
    changePage(1);
  };

  const prevPage = () => {
    if (primeraPagina >= 1) {
      primeraPagina = --primeraPagina;
    }
    changePage(primeraPagina);
  };
  const nextPage = () => {
    if (primeraPagina < totalPages) {
      primeraPagina = ++primeraPagina;
    }
    changePage(primeraPagina);
  };
  const changePage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    resultEventos = [];
    for (
      let i = (page - 1) * maxAvatarsPerPage;
      i < page * maxAvatarsPerPage;
      i++
    ) {
      resultEventos = [...resultEventos, eventos[i]];
    }
    if (primeraPagina > 1) {
      ocultar = false;
    } else {
      ocultar = true;
    }
    if (primeraPagina >= totalPages) {
      ocultarNext = true;
    } else {
      ocultarNext = false;
    }
  };
  $: getEventsFromApiGolofGol();
</script>

<section class="layout">
  <section class="list">
    {#if resultEventos.length}
      {#each resultEventos as evento}
        <div class="event" style={`background-image: url('${evento.url}')`} />
        <!-- <img src={evento.portada} width="96px" alt="" /> -->
      {/each}
    {/if}
  </section>
  <div class="navigation">
    <button class="visible" class:ocultar-next={ocultarNext} on:click={nextPage}
      >Next</button
    >
    <aside>
      <div><small>Pagina: {primeraPagina}</small></div>
      <div><small>Events per page: {maxAvatarsPerPage}</small></div>
      <div><small>Total de paginas: {totalPages}</small></div>
    </aside>
    <button class="visible" class:ocultar on:click={prevPage}>Prev</button>
  </div>
</section>

<style>
  * {
    user-select: none;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    color: #000;
  }
  .layout {
    display: grid;
    grid-template-rows: 1fr auto;
    width: 50vw;
    height: 75vh;
    align-items: center;
    justify-items: center;
  }

  .ocultar {
    user-select: none;
    visibility: hidden;
  }
  .ocultar-next {
    user-select: none;
    visibility: hidden;
  }
  .visible {
    user-select: none;
    padding: 0.15em 0.5em;
    font-weight: 900;
    font-size: medium;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin: 0.5em;
    background-color: transparent;
    cursor: pointer;
    width: 150px;
    background-color: goldenrod;
    color: white;
    border-radius: 8px;
  }
  .visible:hover {
    background-color: white;
    color: goldenrod;
  }
  .list {
    --event-size: 1fr;
    --paddin-event: 2em;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(2, var(--event-size));
    grid-template-rows: repeat(2, 1fr);
    gap: 10%;

    height: 300px;
    width: 300px;

    transform: rotate(45deg);
  }

  .navigation {
    display: flex;
    width: 100%;
    /* background-color: oldlace; */
    justify-content: space-between;
    /* border: 1px solid rgba(61, 60, 58, 0.452); */
  }
  .event {
    background-color: white;
    width: var(--event-size);
    height: var(--event-size);
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    transform-origin: center;
    transform: rotate(-45deg);
    box-shadow: 2px 4px 10px 0.5px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    pointer-events: all;
    border-radius: 8px;
  }

  .event:active,
  .event:focus {
    animation: transformEvent 0.5s both ease;
  }
  @keyframes transformEvent {
    from {
      position: fixed;
      width: 50%;
      height: 50%;
      transform: scale(1.5) rotate(-45deg) translate(0px, 50px);
      box-shadow: 0px 0px 5px 1px #000;
      background-color: #000;
      border: 5px solid white;
      z-index: 10;
    }
    to {
      position: fixed;
      width: 50%;
      height: 50%;
      transform: scale(3) rotate(-45deg) translate(-0px, 15px);
      box-shadow: 0px 0px 5px 1px #000;
      background-color: #000;
      border: 5px solid white;
      z-index: 10;
    }
  }
</style>
