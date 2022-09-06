import * as cheerio from "cheerio";
import { TranscriptionPlugin } from "./transcriptionPlugin";
import { Transcription } from "./transcriptionTypes";

export class TheBassment extends TranscriptionPlugin {
  query_urls: string[] = [
    "https://www.thebassment.info/wp-admin/admin-ajax.php?id=1OBKenkteJKlZFShO8Yy74Vtww4WMrx_o&listtoken=0055f5f1fed569d085e0a60c120f4a8d&account_id=106417727638106904585&lastFolder=1EiZ0eD_YzgqcbhXBZLHya3qN9KDUltIM&folderPath=WyIxRWlaMGVEX1l6Z3FjYmhYQlpMSHlhM3FOOUtEVWx0SU0iXQ%3D%3D&sort=name%3Aasc&action=useyourdrive-get-filelist&_ajax_nonce=54ca70f259&mobile=false&query=",
  ];
  page_url: string = "https://www.thebassment.info/transcriptions/";
  name: string = "The Bassment";

  parseHTML(text: string): Transcription[] {
    let transcriptions: Transcription[] = [];
    const $ = cheerio.load(JSON.parse(text).html);
    for (const a of $("a.entry_link.entry_action_download")) {
      const node = $(a);
      const [url, [artist, song]] = [
        node.attr("href"),
        node.attr("title").split("-"),
      ];
      transcriptions.push({
        song: song.substring(0, song.indexOf(".pdf")).trim(),
        artist: artist.trim(),
        source: this.name,
        parent_url: this.page_url,
        url: url,
      });
    }
    return transcriptions;
  }
}
