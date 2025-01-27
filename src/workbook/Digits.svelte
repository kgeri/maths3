<script lang="ts">
    type N = number | null;
    type Direction = 'ltr' | 'rtl' | 'none';

    export let width = 1;
    export let dir: Direction = 'none';

    const inputs: HTMLElement[] = Array<HTMLElement>(width);

    export function focus() {
        inputs.at(dir == 'ltr' ? 0 : -1)?.focus();
    }

    export function clear() {
        inputs.forEach((input) => (input.innerHTML = ''));
    }

    export function getValue(): number {
        return parseInt(inputs.map((input) => input.innerHTML || '').join(''));
    }

    function onInput(event: Event) {
        event.preventDefault();

        const inputEl = event.target as HTMLElement;
        const i = inputs.indexOf(inputEl);

        const digit = parseInt((event as InputEvent).data || '') % 10;
        if (isNaN(digit)) {
            inputEl.innerHTML = <any>null;
        } else {
            inputEl.innerHTML = String(digit);
        }

        if (dir != 'none') {
            // Focus on the next or previous input box, depending on dir
            const nextInput = inputs.at(dir == 'ltr' ? i + 1 : i - 1);
            if (nextInput) {
                nextInput.focus();
            }
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
</script>

{#each { length: width } as _, i}
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
