<script lang="ts">
    import { onMount } from 'svelte';
    import Workbook from './workbook/Workbook.svelte';
    import { nextInt, pickOne, type Result } from './model';
    import Row from './workbook/Row.svelte';
    import Chars from './workbook/Chars.svelte';
    import Digits from './workbook/Digits.svelte';

    const Min = 100; // Range will be [Min, Max)
    const Max = 500;

    let a: number;
    let b: number;
    let op: string;
    let response: number | null;
    let responseElement: Digits;

    export function evaluate(): Result {
        const expected = op == '+' ? a + b : a - b;
        const result = {
            correct: response === expected,
            message: `${a} ${op} ${b} = ${response} (${expected})`,
        };

        response = null;
        next();

        return result;
    }

    onMount(next);

    function next() {
        a = nextInt(Min, Max);
        b = nextInt(Min, Max);
        if (b > a) [a, b] = [b, a];
        op = pickOne(['+', '-']);
        responseElement.focus();
    }
</script>

<div class="question">
    <Workbook>
        <Row>
            <Chars width={5} value={`${a}`} />
        </Row>
        <Row>
            <Chars width={5} value={`${op}${b}`} />
        </Row>
        <Row>
            <Digits width={5} bind:this={responseElement} bind:value={response} dir="rtl" />
        </Row>
    </Workbook>
</div>

<style>
    .question {
        padding: 0.2em;
    }
</style>
