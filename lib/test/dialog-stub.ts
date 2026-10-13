// jsdom 尚未實作原生 <dialog> 的 showModal / close。
//
// 補上的替身只做一件事：切換 open 屬性。那已足以驗證「對話框現在是開還是關」
// 以及它在無障礙樹裡的樣貌 —— 焦點鎖定、inert 背景、Esc 關閉這些是瀏覽器的
// 行為，在 jsdom 補一個替身等於測自己寫的替身，沒有意義。
//
// 三個測試檔都需要它（Dialog、AlertDialog、DialogCombobox），所以放在這裡
// 共用，而不是各自抄一份。
export function stubNativeDialog() {
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
      this.open = true
    }
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
      this.open = false
      this.dispatchEvent(new Event("close"))
    }
  }
}
