<script lang="ts">
    import { link, Route, Router } from 'svelte-routing';
    import AdditionChallenge from './AdditionChallenge.svelte';
    import i18n from './i18n';
    import MeasuresChallenge from './MeasuresChallenge.svelte';
    import MulSingleChallenge from './MulSingleChallenge.svelte';
    import ResultLog from './ResultLog.svelte';
    import ResultRating from './ResultRating.svelte';
    import RoundingChallenge from './RoundingChallenge.svelte';
    import type { Result, ResultEvaluator } from './model';

    export let url = '';
    let challenge: ResultEvaluator;
    let resultLog: Result[] = [];

    function evaluate() {
        const result = challenge.evaluate();
        if (result) {
            resultLog = [result, ...resultLog];
        }
    }
</script>

<main>
    <Router {url}>
        <nav>
            <a href="/" class="link" use:link>{i18n.types.measures}</a>
            <a href="/rounding" class="link" use:link>{i18n.types.rounding}</a>
            <a href="/addition" class="link" use:link>{i18n.types.addition}</a>
            <a href="/mulsingle" class="link" use:link>{i18n.types.mulsingle}</a>
        </nav>

        <form on:submit|preventDefault={evaluate}>
            <Route path="/"><MeasuresChallenge bind:this={challenge} /></Route>
            <Route path="/addition"><AdditionChallenge bind:this={challenge} /></Route>
            <Route path="/mb1k"><MulSingleChallenge bind:this={challenge} /></Route><!-- legacy -->
            <Route path="/mulsingle"><MulSingleChallenge bind:this={challenge} /></Route>
            <Route path="/rounding"><RoundingChallenge bind:this={challenge} /></Route>

            <input type="submit" value={i18n.submit} />
        </form>
    </Router>
    <ResultRating {resultLog} />
    <ResultLog {resultLog} />
</main>

<style>
    nav {
        font-size: small;
    }

    nav a + a:before {
        content: '|';
        padding: 0 0.2em;
    }

    form {
        font-size: 1.8em;
        text-align: center;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr min-content;
        align-content: center;
        align-items: center;
    }

    input[type='submit'] {
        grid-area: 2 / 1 / 3 / 6;
    }
</style>
