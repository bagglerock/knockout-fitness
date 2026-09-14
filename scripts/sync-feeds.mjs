import { mkdir, rename, writeFile } from 'node:fs/promises';
import { isAbsolute, join } from 'node:path';
import { instagramFeed } from './providers/instagram.mjs';
import { calendarFeed } from './providers/calendar.mjs';

async function saveFeed(name, data, output) {
  await mkdir(output, { recursive: true });
  const temp = join(output, `.${name}-${process.pid}.tmp`);
  await writeFile(temp, JSON.stringify(data), { mode: 0o644 });
  await rename(temp, join(output, `${name}.json`));
}
async function syncProvider(name, factory, output) {
  try {
    await saveFeed(name, await factory(process.env), output);
    console.log(`${name}: feed updated`);
  } catch {
    console.error(
      `${name}: update failed; previous feed retained. Check account access and private configuration.`,
    );
    process.exitCode = 1;
  }
}
async function main() {
  const output = process.env.FEED_OUTPUT_DIR;
  if (!output || !isAbsolute(output))
    throw new Error('FEED_OUTPUT_DIR must be an absolute path to the public feeds directory');
  const instagram = Boolean(process.env.INSTAGRAM_ACCESS_TOKEN);
  const calendar = Boolean(process.env.GOOGLE_CALENDAR_ID && process.env.GOOGLE_API_KEY);
  if (!instagram && !calendar)
    throw new Error('Configure at least one provider in the private environment');
  if (instagram) await syncProvider('instagram', instagramFeed, output);
  if (calendar) await syncProvider('calendar', calendarFeed, output);
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
