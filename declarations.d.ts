declare module "vue-qrcode-reader"
declare module "vue-qr-reader/dist/lib/vue-qr-reader.umd.js"
declare module "html5-qrcode"
declare var Html5QrcodeScanner: Html5QrcodeScanner;

interface Window {
  Html5QrcodeScanner: Html5QrcodeScanner
}
