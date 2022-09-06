import { FreeBassTranscriptions } from "~/api_plugins/freeBassTranscriptions";
import { BassLessons } from "~/api_plugins/bassLessons";
import { TheBassment } from "~/api_plugins/theBassment";

let plugins = [
  FreeBassTranscriptions,
  BassLessons,
  TheBassment,
];

async function getTranscriptions() {
  let [transcriptions, errors] = [[], []];
  await Promise.all(
    plugins.map((plugin) => {
      const pluginInstance = new plugin();
      return pluginInstance
        .fetchTranscriptions()
        .then((t) => transcriptions.push(...t))
        .catch((err) => {
          console.log(err);
          errors.push(err);
        });
    })
  );
  transcriptions.sort((a, b) => a.artist.localeCompare(b.artist));
  return {
    transcriptions: transcriptions,
    errors: errors,
  };
}

export default defineEventHandler(async (event) => {
  return await getTranscriptions();
});
