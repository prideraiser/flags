/**
 * Example usage of @prideraiser/flags
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

// Import the component (registers <pride-flag> custom element)
import "@prideraiser/flags";
import { PrideFlag } from "@prideraiser/flags";

// Example 1: Basic usage with vanilla JavaScript
function example1() {
  // Create a flag element
  const flag = document.createElement("pride-flag");
  flag.setAttribute("flag-variant", "trans");
  flag.setAttribute("width", "400");
  flag.setAttribute("height", "267");

  // Listen for events
  flag.addEventListener("flag-loaded", (e: Event) => {
    const customEvent = e as CustomEvent;
    console.log("Flag loaded:", customEvent.detail.flag);
  });

  flag.addEventListener("flag-error", (e: Event) => {
    const customEvent = e as CustomEvent;
    console.error("Flag error:", customEvent.detail.error);
  });

  document.body.appendChild(flag);
}

// Example 2: Display the current awareness period flag
function example2() {
  const flag = document.createElement("pride-flag");
  flag.setAttribute("flag-variant", "current");
  flag.setAttribute("width", "300");
  flag.setAttribute("height", "200");
  document.body.appendChild(flag);
}

// Example 3: Display all flags
function example3() {
  const flags = PrideFlag.getVariants();
  const container = document.getElementById("flags-container");

  if (!container) return;

  flags.forEach((flagData) => {
    const flagElement = document.createElement("pride-flag");
    flagElement.setAttribute("flag-variant", flagData.slug);
    flagElement.setAttribute("width", "300");
    flagElement.setAttribute("height", "200");

    const label = document.createElement("p");
    label.textContent = flagData.name;

    const wrapper = document.createElement("div");
    wrapper.appendChild(flagElement);
    wrapper.appendChild(label);

    container.appendChild(wrapper);
  });
}

// Example 4: Get a specific flag's data
function example4() {
  const lesbianFlag = PrideFlag.getVariants().find((f) => f.slug === "lesbian");

  if (lesbianFlag) {
    console.log("Flag name:", lesbianFlag.name);
    console.log("Number of colors:", lesbianFlag.colors.length);
  }
}

// Example 5: Display flag for current awareness period
function example5() {
  const flag = document.createElement("pride-flag");
  flag.setAttribute("flag-variant", "current");
  flag.setAttribute("width", "400");
  flag.setAttribute("height", "267");

  flag.addEventListener("flag-loaded", (e: Event) => {
    const customEvent = e as CustomEvent;
    console.log("Current awareness period flag:", customEvent.detail.flag);
  });

  document.body.appendChild(flag);
}

// Example 6: Using with TypeScript
function example6() {
  const flags = PrideFlag.getVariants();

  const rainbowFlag = flags.find((f) => f.slug === "6-stripe");

  if (rainbowFlag) {
    // TypeScript knows the exact structure
    rainbowFlag.colors.forEach((color) => {
      console.log(`Color: ${color}`);
    });
  }
}

// Example 7: React component (JSX)
/*
import '@prideraiser/flags';

function PrideFlagDisplay({ variant = 'trans', width = 300, height = 200 }) {
  return (
    <div>
      <h2>Pride Flag</h2>
      <pride-flag
        flag-variant={variant}
        width={width}
        height={height}
      />
    </div>
  );
}
*/

// Example 7: Vue component
/*
<template>
  <div>
    <h2>Pride Flag</h2>
    <pride-flag
      :flag-variant="variant"
      :width="300"
      :height="200"
      @flag-loaded="onFlagLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import '@prideraiser/flags';
import { ref } from 'vue';

const variant = ref('trans');

function onFlagLoaded(event: CustomEvent) {
  console.log('Flag loaded:', event.detail.flag);
}
</script>
*/

// Example 8: Svelte component
/*
<script lang="ts">
  import '@prideraiser/flags';

  let variant = 'trans';

  function handleFlagLoaded(event: CustomEvent) {
    console.log('Flag loaded:', event.detail.flag);
  }
</script>

<div>
  <h2>Pride Flag</h2>
  <pride-flag
    flag-variant={variant}
    width={300}
    height={200}
    on:flag-loaded={handleFlagLoaded}
  />
</div>
*/

// Export examples for use
export { example1, example2, example3, example4, example5 };
