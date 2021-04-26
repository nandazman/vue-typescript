/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div>
    <p class="error">{{ error }}</p>

    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <vue-qr-reader v-on:code-scanned="codeArrived" v-on:error-captured="errorCaptured">
    </vue-qr-reader>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line import/extensions
import VueQrReader from 'vue-qr-reader/dist/lib/vue-qr-reader.umd.js';

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
    this.result = code;
    setTimeout(() => {
      this.result = 'ASDADFASFDASFASD';
    }, 15000);
  }

  errorCaptured(error: Error): void {
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
  }
}
</script>
