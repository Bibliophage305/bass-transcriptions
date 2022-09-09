import { Transcription } from "./transcriptionTypes";

export abstract class TranscriptionPlugin {
  query_urls: string[];
  page_url: string;
  name: string;

  fetchTranscriptions(): Promise<Transcription[]> {
    return new Promise<Transcription[]>((resolve, reject) => {
      return Promise.all(
        this.query_urls.map((query_url) =>
          this.fetchTranscriptionsFromURL(query_url)
        )
      )
        .then((values) => {
          resolve(values.flat(1));
        })
        .catch(reject);
    });
  }

  fetchTranscriptionsFromURL(query_url: string): Promise<Transcription[]> {
    return new Promise<Transcription[]>((resolve, reject) =>
      fetch(query_url)
        .then((response) => {
          if (!response.ok) {
            let err = new Error(response.statusText);
            reject(err);
          }
          try {
            return response.text();
          } catch (err) {
            reject(err);
          }
        })
        .then((text) => {
          try {
            resolve(this.parseHTML(text));
          } catch (err) {
            console.log(query_url);
            console.log(text);
            reject(err);
          }
        })
    );
  }

  abstract parseHTML(text: string): Transcription[];
}
