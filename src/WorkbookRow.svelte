<script lang="ts">
    type N = number | null;

    export let width = 1;
    export let value: string | N = '';
    export let editable = false;

    let chars: string[];
    let digits: N[] = [];

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

    function onFocus(event: Event) {
        (event.target as HTMLInputElement).select();
    }
</script>

<tr>
    {#if digits.length > 0}
        {#each digits as _, i}
            <input type="number" maxlength="1" bind:value={digits[i]} on:focus={onFocus} />
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

    /* Hide the spinner hack */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type='number'] {
        appearance: textfield;
        -moz-appearance: textfield;
    }
    /* End of hack */
</style>
