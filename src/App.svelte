<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import ResultLog from "./ResultLog.svelte";
  import ResultRating from "./ResultRating.svelte";
  import MeasuresChallenge from "./MeasuresChallenge.svelte";
  import i18n from "./i18n";
  import type { Result, ResultEvaluator } from "./model";

  export let url = "";
  let challenge: ResultEvaluator;
  let resultLog: Result[] = [];

  function evaluate() {
    const result = challenge.evaluate();
    resultLog = [result, ...resultLog];
  }
</script>

<main>
  <!-- <ChallengeForm /> -->
  <Router {url}>
    <nav>
      <Link to="">{i18n.types.measures}</Link>
    </nav>

    <form on:submit|preventDefault={evaluate}>
      <Route path="/"><MeasuresChallenge bind:this={challenge} /></Route>

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

  form {
    font-size: 1.8em;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    align-content: center;
    align-items: center;
  }

  input[type="submit"] {
    grid-area: 2 / 1 / 3 / 6;
  }
</style>
