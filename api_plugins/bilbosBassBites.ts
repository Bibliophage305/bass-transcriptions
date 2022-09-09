import * as cheerio from "cheerio";
import { TranscriptionPlugin } from "./transcriptionPlugin";
import { Transcription } from "./transcriptionTypes";

export class BilbosBassBites extends TranscriptionPlugin {
  page_url: string = "https://bilbosbassbites.co.uk/transcriptions/";
  query_urls: string[] = [this.page_url];
  name: string = "Bilbo's Bass Bites";

  parseHTML(text: string): Transcription[] {
    let transcriptions: Transcription[] = [];
    const $ = cheerio.load(text);
    for (const a of $("table.has-fixed-layout")
      .children("tbody")
      .children("tr")) {
      const [song_col, artist_col, bassist_col, download_col] = $(a).children();
      if ($(song_col).text() === "") {
        continue;
      }
      transcriptions.push({
        song: $(song_col).text().trim(),
        artist: $(artist_col).text().trim(),
        source: this.name,
        parent_url: this.page_url,
        url: $(download_col).find("a").first().attr("href"),
      });
    }
    return transcriptions;
  }
}
