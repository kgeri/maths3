<script lang="ts">
    import { onMount } from 'svelte';

    export let width = 1;
    export let value: string = '';

    let chars: string[];
    const inputs: HTMLInputElement[] = Array<HTMLInputElement>(width);

    onMount(reset);

    export function reset() {
        inputs.forEach((ie) => (ie.value = <any>null));
        inputs.at(-1)?.focus();
    }

    function recomputeChars(value: string | null) {
        const padded = String(value ?? '').padStart(width, ' ');
        chars = [...padded.substring(padded.length - width)];
    }

    $: recomputeChars(value);
</script>

{#each chars as c}
    <td>{c}</td>
{/each}

<style>
    td {
        border: 1px solid lightsteelblue;
        border-collapse: collapse;
        margin: 0;
        padding: 0.2em;
    }
</style>
