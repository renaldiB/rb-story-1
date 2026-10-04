import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateStoryDocument } from '../src/core/schema/story.schema.ts';

function main() {
  const args = process.argv.slice(2);
  const targetFile = args[0] || resolve(process.cwd(), 'src/tests/fixtures/acceptance-story.json');

  console.log(`[VALIDATE] Inspecting story document: ${targetFile}`);

  let rawContent: string;
  try {
    rawContent = readFileSync(targetFile, 'utf-8');
  } catch (err: any) {
    console.error(`[ERROR] Unable to read file at ${targetFile}: ${err.message}`);
    process.exit(1);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawContent);
  } catch (err: any) {
    console.error(`[FAIL] Malformed JSON in ${targetFile}: ${err.message}`);
    process.exit(1);
  }

  const result = validateStoryDocument(parsed);

  if (result.success && result.data) {
    const sceneCount = Object.keys(result.data.scenes).length;
    const endingCount = Object.keys(result.data.endings).length;
    console.log(
      `[PASS] Story valid: "${result.data.title}" [${result.data.genre.toUpperCase()}]`
    );
    console.log(
      `       Scenes: ${sceneCount}, Endings: ${endingCount}, Initial First Scene: ${result.data.firstSceneId}`
    );
    process.exit(0);
  } else {
    console.error(`[FAIL] Schema validation errors found in ${targetFile}:`);
    result.errors?.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }
}

main();
