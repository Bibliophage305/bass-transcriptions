import * as cheerio from "cheerio";
import { TranscriptionPlugin } from "./transcriptionPlugin";
import { Transcription } from "./transcriptionTypes";

export class FreeBassTranscriptions extends TranscriptionPlugin {
  base_url: string = "https://freebasstranscriptions.com";
  page_url: string = this.base_url + "/transcriptions/";
  query_urls: string[] = [this.page_url];
  name: string = "Free Bass Transcriptions";

  parseHTML(text: string): Transcription[] {
    let transcriptions: Transcription[] = [];
    const $ = cheerio.load(text);
    for (const a of $(".entry-content").children().children("a")) {
      let node = $(a);
      let url = node.attr("href");
      if (url.slice(0, 4) !== "http") {
        url = this.base_url + url;
      }
      let [artist, song] = node.text().split("–");
      if (artist === undefined || song === undefined) {
        continue;
      }
      transcriptions.push({
        song: song.trim(),
        artist: artist.trim(),
        source: this.name,
        parent_url: this.page_url,
        url: url,
      });
    }
    return transcriptions;
  }
}
