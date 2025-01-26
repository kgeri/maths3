<script lang="ts">
    type N = number | null;
    type Direction = 'ltr' | 'rtl';

    export let width = 1;
    export let dir: Direction = 'ltr';
    export let value: N = null;

    let digits: N[] = [];
    const inputs: HTMLElement[] = Array<HTMLElement>(width);

    export function focus() {
        inputs.at(dir == 'ltr' ? 0 : -1)?.focus();
    }

    function onInput(event: Event) {
        event.preventDefault();

        const inputEl = event.target as HTMLElement;
        const i = inputs.indexOf(inputEl);

        const digit = parseInt((event as InputEvent).data || '') % 10;
        if (isNaN(digit)) {
            inputEl.innerHTML = <any>null;
            digits[i] = null;
        } else {
            inputEl.innerHTML = String(digit);
            digits[i] = digit;
        }

        // Focus on the previous input box (go backwards)
        const nextInput = inputs.at(dir == 'ltr' ? i + 1 : i - 1);
        if (nextInput) {
            nextInput.focus();
        }
    }

    function onFocus(event: Event) {
        const cell = event.target as HTMLElement;
        const range = document.createRange();
        range.selectNodeContents(cell);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
    }

    function recomputeDigits(value: N) {
        if (value == null) {
            digits = digits.fill(null);
        } else {
            const ds = Array.from(String(value ?? '0'), Number);
            digits =
                ds.length > width
                    ? ds.slice(Math.max(ds.length - width, 0)) //
                    : [...Array(width - ds.length), ...ds]; //
        }
        inputs.forEach((input, i) => (input.innerHTML = digits[i] != null ? String(digits[i]) : ''));
    }

    $: recomputeDigits(value);
    $: value = digits.reduce((acc, d) => (acc ?? 0) * 10 + (d ?? 0), 0);
</script>

{#each digits as _, i}
    <td inputmode="numeric" bind:this={inputs[i]} on:input={onInput} on:focus={onFocus} contenteditable="plaintext-only"
    ></td>
{/each}

<style>
    td {
        background-color: azure;
        border: 1px solid lightsteelblue;
        border-collapse: collapse;
        margin: 0;
        padding: 0.2em;
    }

    td:focus-visible {
        background-color: lightblue;
    }
</style>
