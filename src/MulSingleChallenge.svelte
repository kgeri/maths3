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
    let responseElement: Digits;

    export function evaluate(): Result | null {
        const response = responseElement.getValue();
        if (!response) return null;

        const result = {
            correct: response == a * b,
            message: `${a} * ${b} = ${response}`,
        };

        responseElement.clear();
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
            <Chars width={7} value={`${a}·${b}=`} />
            <Digits width={4} bind:this={responseElement} dir="rtl" />
        </Row>
    </Workbook>
</div>

<style>
    .question {
        padding: 0.2em;
    }
</style>
