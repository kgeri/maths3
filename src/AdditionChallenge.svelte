<script lang="ts">
    import { onMount } from 'svelte';
    import WorkbookGrid from './WorkbookGrid.svelte';
    import { nextInt, pickOne, type Result } from './model';
    import WorkbookRow from './WorkbookRow.svelte';

    const Min = 100; // Range will be [Min, Max)
    const Max = 500;

    let a: number;
    let b: number;
    let op: string;
    let response: number;

    export function evaluate(): Result {
        const expected = op == '+' ? a + b : a - b;
        const result = {
            correct: response === expected,
            message: `${a} ${op} ${b} = ${response} (${expected})`,
        };

        response = 0;
        next();

        return result;
    }

    onMount(next);

    function next() {
        a = nextInt(Min, Max);
        b = nextInt(Min, Max);
        if (b > a) [a, b] = [b, a];
        op = pickOne(['+', '-']);
    }
</script>

<div class="question">
    <WorkbookGrid>
        <WorkbookRow width={5} value={`${a}`} />
        <WorkbookRow width={5} value={`${op}${b}`} />
        <WorkbookRow width={5} bind:value={response} editable />
    </WorkbookGrid>
</div>

<style>
    .question {
        padding: 0.2em;
    }
</style>
