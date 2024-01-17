<script lang="ts">
    import { onMount } from 'svelte';

    type N = number | null;

    export let width = 1;
    export let value: string | N = '';
    export let editable = false;

    let chars: string[];
    let digits: N[] = [];
    const inputs: HTMLInputElement[] = Array<HTMLInputElement>(width);

    onMount(reset);

    export function reset() {
        for (let i = 0; i < digits.length; i++) digits[i] = null;
        inputs.forEach((ie) => (ie.value = <any>null));
        inputs.at(-1)?.focus();
    }

    function onInput(event: Event) {
        event.preventDefault();

        const inputEl = event.target as HTMLInputElement;
        const i = inputs.indexOf(inputEl);

        const digit = parseInt((event as InputEvent).data || '') % 10;
        if (isNaN(digit)) {
            inputEl.value = <any>null;
            digits[i] = null;
        } else {
            inputEl.value = String(digit);
            digits[i] = digit;
        }

        // Focus on the previous input box (go backwards)
        const nextInput = inputs.at(i - 1);
        if (nextInput) {
            nextInput.focus();
        }
    }

    function onFocus(event: Event) {
        (event.target as HTMLInputElement).select();
    }

    function recomputeCharsOrDigits(value: string | N) {
        if (editable) {
            const ds = Array.from(String(value ?? '0'), Number);
            digits =
                ds.length > width
                    ? ds.slice(Math.max(ds.length - width, 0)) //
                    : [...Array(width - ds.length), ...ds]; //
        } else {
            const padded = String(value ?? '').padStart(width, ' ');
            chars = [...padded.substring(padded.length - width)];
        }
    }

    $: recomputeCharsOrDigits(value);
    $: value = digits.reduce((acc, d) => (acc ?? 0) * 10 + (d ?? 0), 0);
</script>

<tr>
    {#if digits.length > 0}
        {#each digits as _, i}
            <input
                type="text"
                maxlength="1"
                inputmode="numeric"
                bind:this={inputs[i]}
                on:input={onInput}
                on:focus={onFocus}
            />
        {/each}
    {:else if chars}
        {#each chars as c}
            <input type="text" value={c} readonly />
        {/each}
    {/if}
</tr>

<style>
    input {
        display: table-cell;
        width: 1.5em;
        height: 1.5em;
        margin: 0;
        padding: 0.1em;
        padding-block: unset;
        padding-inline: unset;
        border-radius: 0;
        outline: 1px solid lightsteelblue;
        box-sizing: border-box;
        text-align: center;
        vertical-align: middle;
    }

    input:read-only {
        pointer-events: none;
        border: none;
    }

    input:focus-visible {
        background-color: lightblue;
    }
</style>
