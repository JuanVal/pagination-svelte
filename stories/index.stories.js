import "../src/index.svelte";
import { html } from "lit-html";

export default {
  parameters: {
    layout: "top",
  },
};

export const pagination = () => html`<njv-pagination></njv-pagination> `;
