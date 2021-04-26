<template>
  <div>
    <p class="error">{{ errorMessage }} ini apaan dah</p>

    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <vue-qr-reader
    v-on:code-scanned="codeArrived"
    v-on:error-captured="() => errorCaptured()"
    :stop-on-scanned="true"
    :draw-on-found="true"
    :responsive="false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line import/extensions
import VueQrReader from 'vue-qr-reader/dist/lib/vue-qr-reader.umd.js';
import { instance } from '@/utils/axios';

@Component({
  components: {
    VueQrReader,
  },
})

export default class Test extends Vue {
  public result = '';

  public errorMessage = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  codeArrived(code: string): void {
    this.fetchAPI(code);
  }

  async fetchAPI(endpoint: string): Promise<void> {
    const response = await instance.get(`https://pokeapi.co/api/v2/pokemon/${endpoint}`);
    this.result = JSON.stringify(response);
  }

  errorCaptured(error: Error): string {
    switch (error.name) {
      case 'NotAllowedError':
        this.errorMessage = 'Camera permission denied.';
        break;
      case 'NotFoundError':
        this.errorMessage = 'There is no connected camera.';
        break;
      case 'NotSupportedError':
        this.errorMessage = 'Seems like this page is served in non-secure context.';
        break;
      case 'NotReadableError':
        this.errorMessage = 'Couldn\'t access your camera. Is it already in use?';
        break;
      case 'OverconstrainedError':
        this.errorMessage = 'Constraints don\'t match any installed camera.';
        break;
      default:
        this.errorMessage = `UNKNOWN ERROR: ${error.message}`;
    }
    console.error(this.errorMessage);
    return this.errorMessage;
  }
}
</script>
