/**
 * 把 aria-activedescendant 指到的那個選項捲進可視範圍。
 *
 * 用 aria-activedescendant 的元件（Listbox、Combobox）焦點永遠留在容器或輸入框
 * 上，選項本身從不接收焦點 —— 所以瀏覽器沒有任何理由替你捲動，方向鍵走到第五個
 * 選項時，使用者看到的還是前四個。這件事得自己做。
 *
 * block: "nearest" 是刻意的：只在選項真的跑出可視範圍時才捲，而且只捲剛好夠的
 * 距離。用 "center" 會讓每一次方向鍵都把清單跳一下，看起來像在閃。
 *
 * 存在性檢查不是多餘的：jsdom 沒有實作 scrollIntoView，測試環境裡它是 undefined。
 */
export function scrollActiveOptionIntoView(
  container: HTMLElement | null,
  optionId: string | undefined,
) {
  if (!container || !optionId) return
  const option = container.querySelector(`#${CSS.escape(optionId)}`)
  option?.scrollIntoView?.({ block: "nearest" })
}
