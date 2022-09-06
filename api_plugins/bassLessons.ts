import { TranscriptionPlugin } from "./transcriptionPlugin";
import { Transcription } from "./transcriptionTypes";

export class BassLessons extends TranscriptionPlugin {
  query_urls: string[] = ["https://basslessons.be/json/transcriptions.json"];
  page_url: string = "https://basslessons.be/transcriptions.php";
  name: string = "Bass Lessons";

  parseHTML(text: string): Transcription[] {
    let transcriptions: Transcription[] = [];
    let j = JSON.parse(text);
    j.forEach((element: { titel: string; uitvoerder: string; trans_id: any; }) => {
      transcriptions.push({
        song: element.titel.trim(),
        artist: element.uitvoerder.trim(),
        source: this.name,
        parent_url: this.page_url,
        url: `${this.page_url}?i=${element.trans_id}`,
      });
    });
    return transcriptions;
  }
}
