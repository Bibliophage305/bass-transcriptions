<script setup>
import { matSearch } from "@quasar/extras/material-icons";
import "vue3-easy-data-table/dist/style.css";
const {
  data: response,
  pending,
  refresh,
  error,
} = await useFetch("/api/transcriptions");
const search = ref("");
const pagination = ref({
  rowsPerPage: 0,
});
const errors = computed(() => {
  return response?.value?.errors;
});
const transcriptions = computed(() => {
  if (search.value === "") {
    return response?.value?.transcriptions;
  }
  return response?.value?.transcriptions.filter((t) => {
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
    name: "artist",
    label: "Artist",
    field: "artist",
  },
  {
    name: "song",
    label: "Song",
    field: "song",
  },
  {
    name: "source_link",
    label: "Source",
    field: "source",
  },
  {
    name: "download",
    label: "Download",
    field: "download",
  },
]);
</script>

<template>
  <div class="row">
    <div class="row" v-if="errors">
      <div class="col">
        <p v-for="(index, error) of errors" :key="index">
          {{ error }}
        </p>
      </div>
    </div>
    <div class="col">
      <q-table
        title="Transcriptions"
        :rows="transcriptions"
        :columns="headers"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        :loading="pending"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="search"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon :name="matSearch" />
            </template>
          </q-input>
        </template>
      </q-table>
      <!-- <EasyDataTable
        :headers="headers"
        :items="transcriptions"
        :loading="pending"
      >
        <template #item-source_link="{ source, parent_url }">
          <a :href="parent_url" target="_blank">{{ source }}</a>
        </template>
        <template #item-download="{ url }">
          <v-btn text icon :href="url" target="_blank">
              <v-icon>mdi-download</v-icon>
            </v-btn>
        </template>
      </EasyDataTable> -->
    </div>
  </div>
</template>
