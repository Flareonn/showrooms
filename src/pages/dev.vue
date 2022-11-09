<script lang="ts" setup>
import { ref, watch } from "vue";

const model1 = ref("");
const model2 = ref("");
const model3 = ref("");
const model4 = ref("");
const model5 = ref("");
const model6 = ref("");
</script>

<template>
  <pre>
    {{ model1 }}
  </pre>
  <base-input component="file" id="text" v-model="model1" />
  <pre>
    {{ model2 }}
  </pre>
  <base-input component="password" v-model="model2" />
  <pre>
    {{ model3 }}
  </pre>
  <base-input component="search" v-model="model3" />
  LAZY
  <pre>
    {{ model4 }}
  </pre>
  <base-input component="file" id="text1" v-model.lazy="model4" />
  <pre>
    {{ model5 }}
  </pre>
  <base-input component="password" v-model.lazy="model5" />
  <pre>
    {{ model6 }}
  </pre>
  <base-input component="search" v-model.lazy="model6" />
</template>
