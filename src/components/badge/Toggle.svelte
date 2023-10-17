<script lang="ts">
  import { setUpCanvas } from "./canvas";

  let formStatus: "initial" | "loading" | "success" | "error" = "initial";
  let isEditing = false;

  let canvasElement: HTMLCanvasElement;
  let containerElement: HTMLElement;

  $: {
    if (containerElement && canvasElement) {
      setUpCanvas(containerElement, canvasElement);
    }
  }

  async function onSubmit(event: Event) {
    event.preventDefault();
    const canvas = document.querySelector("canvas")!;
    const badgeImgUrl = canvas.toDataURL();

    formStatus = "loading";

    const res = await fetch("/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ badgeImgUrl }),
    });

    if (!res.ok) {
      formStatus = "error";
      return;
    }

    formStatus = "success";
    window.location.reload();
  }
</script>

{#if isEditing}
  <form bind:this={containerElement} on:submit|preventDefault={onSubmit}>
    <button class="submit-btn" disabled={formStatus === "loading"}
      >Save
      {#if formStatus === "loading"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          /><path
            fill="currentColor"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            ><animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            /></path
          ></svg
        >
      {/if}
    </button>

    <div class="edit-container">
      {#if formStatus === "error"}
        <p class="error">Problem updating your badge {":("} Try again later!</p>
      {/if}
      <canvas bind:this={canvasElement} width="1080" height="1440" />
      <fieldset>
        <legend class="sr-only">Color</legend>

        <input
          type="radio"
          id="color-purple"
          name="color"
          value="purple"
          checked
        />
        <label class="sr-only" for="color-purple"> Purple</label>

        <input type="radio" id="color-orange" name="color" value="orange" />
        <label class="sr-only" for="color-orange"> Orange</label>

        <input type="radio" id="color-pink" name="color" value="pink" />
        <label class="sr-only" for="color-pink"> Pink</label>

        <input type="radio" id="color-green" name="color" value="green" />
        <label class="sr-only" for="color-green"> Green</label>
      </fieldset>
    </div>
  </form>
{:else}
  <button class="edit-btn" on:click={() => (isEditing = true)}
    >Add a drawing <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
      /></svg
    ></button
  >
  <slot name="preview" />
{/if}

<style>
  .error {
    background-color: var(--red-3);
    color: var(--red-12);
    padding-inline: var(--size-2);
    padding-block: var(--size-1);
  }

  button {
    font-size: var(--font-size-lg);
    border-radius: var(--size-2);
    padding-block: var(--size-2);
    padding-inline: var(--size-5);
    background-color: var(--purple);
    box-shadow: var(--shadow-3);
    transition: scale 0.5s var(--ease-spring-5);
    display: flex;
    align-items: center;
    gap: var(--size-2);
  }

  button:hover {
    scale: 1.1;
  }

  button svg {
    width: 1em;
    height: 1em;
  }

  .submit-btn {
    background-color: var(--purple);
    margin-block-end: var(--size-3);
  }

  .edit-btn {
    background-color: var(--surface-2);
    margin-block-end: var(--size-3);
  }

  .edit-container {
    display: flex;
    gap: var(--size-2);
    align-items: flex-start;
  }

  fieldset {
    background-color: var(--surface-2);
    border-radius: var(--size-4);
    padding: var(--size-2);
    border: var(--size-1) solid var(--surface-1);
    gap: var(--size-2);
    display: flex;
    flex-direction: column;
  }

  canvas {
    background: white;
    max-width: 80%;
    max-height: 80vh;
    border-radius: var(--size-4);
    box-shadow: var(--shadow-5);
  }

  input[name="color"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: var(--size-5);
    height: var(--size-5);
    border-radius: 50%;
    background-color: var(--surface-3);
    transition: scale 0.1s ease-in-out;
    position: relative;
  }

  input#color-orange {
    background-color: var(--orange);
  }

  input#color-purple {
    background-color: var(--purple);
  }

  input#color-pink {
    background-color: var(--pink);
  }

  input#color-green {
    background-color: var(--green);
  }

  input[name="color"]:checked {
    scale: 1.1;
  }

  input[name="color"]:checked::before {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 100%;
    border: 2px solid var(--surface-4);
  }
</style>
