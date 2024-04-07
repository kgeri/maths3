<script lang="ts">
    import { onMount } from 'svelte';
    import ChallengeInput from './ChallengeInput.svelte';
    import ChallengeValue from './ChallengeValue.svelte';
    import { Unit, nextInt, pickOne, pickTwo, type Result } from './model';

    const Max = 1000;

    let a: number;
    let b: number;
    let response: number;

    export function evaluate(): Result {
        const result = {
            correct: response == a * b,
            message: `${a} * ${b} = ${response}`,
        };

        response = <any>undefined;
        next();

        return result;
    }

    onMount(next);

    function next() {
        b = nextInt(2, 10);
        a = nextInt(100, Math.floor(1000 / b));
    }
</script>

<div class="question">
    <ChallengeValue value={a} />
    <div>·</div>
    <ChallengeValue value={b} />
    <div>=</div>
    <ChallengeInput autofocus bind:response max={Max} />
</div>

<style>
    .question {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 1fr;
        align-content: center;
        align-items: center;
    }
</style>
