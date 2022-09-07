import * as cheerio from "cheerio";
import { TranscriptionPlugin } from "./transcriptionPlugin";
import { Transcription } from "./transcriptionTypes";

export class GrooveOfTheWeek extends TranscriptionPlugin {
  page_url: string = "https://freebasstranscriptions.com/groove-of-the-week/";
  query_urls: string[] = [
    this.page_url,
    ...[2, 3, 4, 5, 6].map((d) => `${this.page_url}page/${d}`),
  ];
  name: string = "Free Bass Transcriptions - Groove of the Week";

  parseHTML(text: string): Transcription[] {
    let transcriptions: Transcription[] = [];
    const $ = cheerio.load(text);
    for (const a of $("a.wp-block-getwid-template-post-title__link")) {
      const node = $(a);
      const url = node.attr("href");
      let trimmed = node
        .text()
        .split(/#|:|–|‘/)
        .slice(1)
        .map((t) => t.replace(/^[ '"‘’-]+|([ '"‘’-]| and)+$/g, ""))
        .slice(1)
        .filter((t) => t.replace(/\d+/, "") !== "");
      switch (trimmed.length) {
        case 2:
          transcriptions.push({
            song: trimmed[1].trim(),
            artist: trimmed[0].trim(),
            source: this.name,
            parent_url: this.page_url,
            url: url,
          });
          break;
        case 4:
          transcriptions.push({
            song: trimmed[1].trim(),
            artist: trimmed[0].trim(),
            source: this.name,
            parent_url: this.page_url,
            url: url,
          });
          transcriptions.push({
            song: trimmed[3].trim(),
            artist: trimmed[2].trim(),
            source: this.name,
            parent_url: this.page_url,
            url: url,
          });
          break;
        case 1:
          let [artist, song] = trimmed[0].split("  '");
          transcriptions.push({
            song: song.trim(),
            artist: artist.trim(),
            source: this.name,
            parent_url: this.page_url,
            url: url,
          });
          break;
      }
    }
    return transcriptions;
  }
}
