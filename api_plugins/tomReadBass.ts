import * as cheerio from "cheerio";
import { TranscriptionPlugin } from "./transcriptionPlugin";
import { Transcription } from "./transcriptionTypes";

export class TomReadBass extends TranscriptionPlugin {
  page_url: string = "https://www.tomreadbass.co.uk/transcriptions";
  query_urls: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "y",
    "z",
    "0-9",
  ].map((t) => `${this.page_url}-${t}`);
  name: string = "Tom Read Bass";

  parseHTML(text: string): Transcription[] {
    let transcriptions: Transcription[] = [];
    const $ = cheerio.load(text);
    for (const row of $("p.font_8", "main").children("span")) {
      const artist_text = $(row).text().split(/(\s){3,}/);
      transcriptions.push({
        song: $(row).find("span").first().find("a").first().text().trim(),
        artist: artist_text[artist_text.length - 1].trim(),
        source: this.name,
        parent_url: this.page_url,
        url: $(row).find("span").first().find("a").first().attr("href"),
      });
    }
    return transcriptions;
  }
}
