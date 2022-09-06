<script setup>
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
const { data: response, pending, refresh, error } = await useFetch("/api/transcriptions");
const search = ref("");
const transcriptions = computed(() => {
  if (search.value === "") {
    return response.value.transcriptions;
  }
  return response.value.transcriptions.filter((t) => {
    const words = [
      ...t.artist
        .toLowerCase()
        .replace(/[^a-z\d\s]+/gi, "")
        .split(" "),
      ...t.song
        .toLowerCase()
        .replace(/[^a-z\d\s]+/gi, "")
        .split(" "),
    ];
    return search.value
      .toLowerCase()
      .replace(/[^a-z\d\s]+/gi, "")
      .split(" ")
      .every((word) => words.some((w) => w.includes(word)));
  });
});
const headers = ref([
  {
    text: "Artist",
    value: "artist",
  },
  {
    text: "Song",
    value: "song",
  },
  {
    text: "Source",
    value: "source_link",
  },
  {
    text: "Download",
    value: "download",
  },
]);
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="refresh()">refetch</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="search" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <EasyDataTable :headers="headers" :items="transcriptions">
          <template #item-source_link="{ source, parent_url }">
            <a :href="parent_url" target="_blank">{{ source }}</a>
          </template>
          <template #item-download="{ url }">
            <v-btn text icon :href="url" target="_blank">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
        </EasyDataTable>
      </v-col>
    </v-row>
  </v-container>
</template>
