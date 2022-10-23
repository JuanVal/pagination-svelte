import "../src/index.svelte";
import { html } from "lit-html";

export default {
  parameters: {
    layout: "centered",
  },
};

export const pagination = () => html`<njv-pagination></njv-pagination> `;
