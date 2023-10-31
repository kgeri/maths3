<script lang="ts">
    import { onMount } from "svelte";
    import ChallengeInput from "./ChallengeInput.svelte";
    import ChallengeValue from "./ChallengeValue.svelte";
    import {
        DistanceUnits,
        Unit,
        WeightUnits,
        nextInt,
        pickOne,
        pickTwo,
        type Result,
    } from "./model";

    const SupportedTypes = [WeightUnits, DistanceUnits];
    const Max = 2000; // Range will be [unitA.multiplier, Max) - in the smallest unit (eg. g, mm, ...)

    let a: number;
    let b: number;
    let unitA: Unit;
    let unitB: Unit;
    let response: number;

    export function evaluate(): Result {
        const result = {
            correct: response == b,
            message: `${a} ${unitA.name} = ${response} ${unitB.name}`,
        };

        response = <any>undefined;
        next();

        return result;
    }

    onMount(next);

    function next() {
        const type = pickOne(SupportedTypes);
        const units = Object.values(type);
        const smallestUnit = units[0];

        [unitA, unitB] = pickTwo(units);
        if (unitA.multiplier < unitB.multiplier) {
            // unitB is the larger unit => using range [unitB, max)
            const rnd = nextInt(unitB.multiplier, Max);
            b = Math.round(smallestUnit.convert(rnd, unitB));
            a = unitB.convert(b, unitA);
        } else {
            // unitA is the larger unit => using range [unitA, max)
            const rnd = nextInt(unitA.multiplier, Max);
            a = Math.round(smallestUnit.convert(rnd, unitA));
            b = unitA.convert(a, unitB);
        }
    }
</script>

<div class="question">
    <ChallengeValue value={a} />
    <div>{unitA?.name}</div>
    <div>=</div>
    <ChallengeInput autofocus bind:response max={Max} />
    <div>{unitB?.name}</div>
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
