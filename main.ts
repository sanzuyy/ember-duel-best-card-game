// Ember Duel — an original card duel for best-card-game-20261122-1826 (Node 22, stdlib only).
// The game is this directory's game/ folder: plain static files a desktop browser loads
// offline (game/index.html, no library, no network request). The program hands it in by
// copying game/ and screenshots/ from beside this file to /output and writing
// /output/dossier.json, the summary the judge reads, with the vendored make.fun library.
// Ember Duel: you vs the Rival, 30 life each; each round both sides play one card from a
// hand of five, higher power wins the round and the loser loses the difference in life,
// with a suit cycle (Flame > Leaf > Tide > Stone > Flame) adding +2 power. Title screen,
// table with both hands, readable values and suits, life bars, score, and win/loss screens.
// Screenshots live in screenshots/ (first by name is the cover). Serve locally with
// `node serve.ts`, then open http://localhost:8080. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Ember Duel's own sanity check: refuse to hand in a game with no table to show.
if (!existsSync(join(here, 'game', 'index.html'))) {
  throw new Error('game/index.html is missing: Ember Duel cannot be handed in without it');
}
const shotCount = existsSync(join(here, 'screenshots'))
  ? (await import('node:fs')).readdirSync(join(here, 'screenshots')).filter((f) => /\.(png|jpe?g)$/i.test(f)).length
  : 0;
console.log(`Ember Duel: handing in ${shotCount} screenshot(s) with the game.`);

mkdirSync(out, { recursive: true });
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the bytes; the others refuse an entry the
// scorer would refuse (more than 4 screenshots or one over 256 KiB; more than 993 files in game/ or 48 MiB of game
// files, in all, or a path under game/ over 1000 bytes: game/ counts beside /output's own 1000-entry cap, its
// screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);
