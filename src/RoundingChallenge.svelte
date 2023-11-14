<script lang="ts">
    import { onMount } from "svelte";
    import ChallengeInput from "./ChallengeInput.svelte";
    import ChallengeValue from "./ChallengeValue.svelte";
    import { nextInt, type Result } from "./model";

    const Max = 500; // Range will be [0, Max)

    let a: number;
    let response: number;

    export function evaluate(): Result {
        const result = {
            correct: response == Math.round(a / 10) * 10,
            message: `${a} ≈ ${response}`,
        };

        response = <any>undefined;
        next();

        return result;
    }

    onMount(next);

    function next() {
        a = nextInt(0, Max);
    }
</script>

<div class="question">
    <ChallengeValue value={a} />
    <div>≈</div>
    <ChallengeInput autofocus bind:response max={Max} />
</div>

<style>
    .question {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        align-content: center;
        align-items: center;
    }
</style>
