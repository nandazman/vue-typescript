<template>
  <div>
    <div>
      Result {{result}}
    </div>
    <div id="qr-code-full-region"></div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component

export default class Html5 extends Vue {
  public result = '';

  mounted(): void {
    const config = { fps: 10, qrbox: 250 };

    const onScanSuccess = (qrCodeMessage: string) => {
      this.result = qrCodeMessage;
      console.log(qrCodeMessage);
    };

    const html5QrcodeScanner = new window.Html5QrcodeScanner(
      'qr-code-full-region', config,
    );
    html5QrcodeScanner.render(onScanSuccess);
  }
}
</script>
