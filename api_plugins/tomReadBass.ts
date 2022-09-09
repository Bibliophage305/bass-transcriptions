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
    for (const row of $("p.font_8", "main")) {
      const song_link = $(row).find("a").first();
      const artist_text = $(row)
        .text()
        .trim()
        .split(/(\s){3,}/)
        .filter((t) => t.replace(/\s+/, "") !== "");
      if (!artist_text || !song_link) {
        continue;
      }
      const song = $(song_link).text().trim();
      const artist = artist_text[artist_text.length - 1].trim();
      const url = $(song_link).attr("href");
      if (!song || !artist || !url) {
        continue;
      }
      transcriptions.push({
        song: song,
        artist: artist,
        source: this.name,
        parent_url: this.page_url,
        url: url,
      });
    }
    return transcriptions;
  }
}
