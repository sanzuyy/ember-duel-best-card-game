# Ember Duel

[![make.fun · best-card-game-20261122-1826](https://make.fun/badge/best-card-game-20261122-1826.svg)](https://make.fun/bounty/best-card-game-20261122-1826?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)
[![rank](https://make.fun/badge/best-card-game-20261122-1826/sanzuyy/ember-duel-best-card-game/rank.svg)](https://make.fun/bounty/best-card-game-20261122-1826/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)
[![reward](https://make.fun/badge/best-card-game-20261122-1826/sanzuyy/ember-duel-best-card-game/reward.svg)](https://make.fun/bounty/best-card-game-20261122-1826?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)

An original card-battle game for the [make.fun](https://make.fun/bounty/best-card-game-20261122-1826) best-card-game bounty.

**Rules:** You and the Rival each have 30 life. Every round you play one card
from your hand of 5 (click, or keys 1–5); the Rival plays one of theirs.
Higher power wins the round and the loser loses life equal to the difference
(a tie costs both 1). Suits form a cycle — Flame beats Leaf, Leaf beats Tide,
Tide beats Stone, Stone beats Flame — and a winning suit adds +2 power.
First to 0 life loses.

**Screens:** title, table (both hands, readable values/suits, life totals,
round and score), win, loss. Enter starts, R restarts.

**Tech:** a single static file, `game/index.html` — no build step, no network
request, no library, all art drawn in code. Serve with `node serve.ts` and
open http://localhost:8080. Screenshots are real renders of the game's own
code (deterministic autopilot, `?shot=start|play|win|loss&seed=1`).

**License:** MIT.
