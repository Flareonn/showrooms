import { watch, WatchSource } from "vue";

export default function (source: WatchSource, node: HTMLElement, cb: Function) {
  watch(
    source,
    (value: boolean) => {
      if (value) {
        window.onkeydown = (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            cb();
          }
        };
        window.onclick = (e: MouseEvent) => {
          if ((e.target as HTMLElement).contains(node)) {
            cb();
          }
        };
      } else {
        window.onkeydown = null;
        window.onclick = null;
      }
    },
    {
      immediate: true,
    }
  );
}
