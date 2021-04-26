<template>
  <div>
    <p class="error">{{ error }}</p>

    <p class="decode-result">Last result: <b>{{ result }}</b></p>

    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { QrcodeStream } from 'vue-qrcode-reader'; // @ is an alias to /src

@Component({
  components: {
    QrcodeStream,
  },
})

export default class Home extends Vue {
  public result = '';

  public error = '';

  public camera = 'auto';

  onDecode(result: string): void {
    this.turnCameraOff();
    this.fetchAPI(result);
  }

  turnCameraOff(): void {
    this.camera = 'off';
  }

  async fetchAPI(endpoint: string): Promise<void> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${endpoint}`);
    const data = await response.json();
    this.result = JSON.stringify(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async onInit(promise: never) {
    try {
      await promise;
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        this.error = 'ERROR: you need to grant camera access permisson';
      } else if (error.name === 'NotFoundError') {
        this.error = 'ERROR: no camera on this device';
      } else if (error.name === 'NotSupportedError') {
        this.error = 'ERROR: secure context required (HTTPS, localhost)';
      } else if (error.name === 'NotReadableError') {
        this.error = 'ERROR: is the camera already in use?';
      } else if (error.name === 'OverconstrainedError') {
        this.error = 'ERROR: installed cameras are not suitable';
      } else if (error.name === 'StreamApiNotSupportedError') {
        this.error = 'ERROR: Stream API is not supported in this browser';
      }
    }
  }
}
</script>
