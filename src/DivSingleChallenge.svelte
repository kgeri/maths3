<script lang="ts">
    import { onMount } from 'svelte';
    import { nextInt, type Result } from './model';
    import Chars from './workbook/Chars.svelte';
    import Digits from './workbook/Digits.svelte';
    import Row from './workbook/Row.svelte';
    import Workbook from './workbook/Workbook.svelte';

    const Max = 9999;

    let a: number;
    let b: number;
    let helpers: Digits[] = [];
    let responseElement: Digits;

    export function evaluate(): Result | null {
        const response = responseElement.getValue();
        if (!response) return null;

        const expected = Math.floor(a / b);
        const result = {
            correct: response === expected,
            message: `${a} : ${b} = ${response} (${expected})`,
        };

        responseElement.clear();
        for (let i = 0; i < helpers.length; i++) helpers[i].clear();
        next();

        return result;
    }

    onMount(next);

    function next() {
        b = nextInt(2, 10);
        a = nextInt(100, Math.floor(Max / b));
        responseElement.focus();
    }
</script>

<div class="question">
    <Workbook>
        <Row>
            <Chars width={7} value={`${a}:${b}=`} />
            <Digits width={4} bind:this={responseElement} dir="ltr" />
        </Row>
        {#each { length: 4 } as _, i}
            <Row>
                <Digits width={4} bind:this={helpers[i]} dir="ltr" />
            </Row>
        {/each}
    </Workbook>
</div>

<style>
    .question {
        padding: 0.2em;
    }
</style>
