import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { sanitize } from "isomorphic-dompurify";
import Squire from 'squire-rte';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import './squire-editor.css';

type buttonOptions = "bold" | "italic" | "underline" | "strikethrough" | "code" | "link" | "remove_formatting" | "h1" | "h2" | "h3" | "ul" | "ol" | "quote" | "image" | "undo" | "redo" | "html";
type formatOptions = 'b' | 'i' | 'u' | 's' | 'code' | 'a' | 'h1' | 'h2' | 'h3' | 'ul' | 'ol' | 'blockquote';
type EditorButton = {
  name: buttonOptions,
  format?: formatOptions,
  icon: string,
  handler: (editor: Squire, btn: EditorButton, event: PointerEvent) => void,
}

const buttons: EditorButton[][] = [
  [
    {
      name: "bold",
      format: 'b',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-bold" viewBox="0 0 16 16"><path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/></svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.removeBold();
        } else {
          squire.bold()
        }
      },
    },
    {
      name: "italic",
      format: 'i',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-italic" viewBox="0 0 16 16"> <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.removeItalic();
        } else {
          squire.italic()
        }
      },
    },
    {
      name: "underline",
      format: 'u',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-underline" viewBox="0 0 16 16"> <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.removeUnderline();
        } else {
          squire.underline()
        }
      },
    },
    {
      name: "strikethrough",
      format: 's',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-strikethrough" viewBox="0 0 16 16"> <path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.removeStrikethrough();
        } else {
          squire.strikethrough()
        }
      },
    },
    {
      name: "code",
      format: 'code',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code" viewBox="0 0 16 16"> <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.removeCode();
        } else {
          squire.code()
        }
      },
    },
    {
      name: "link",
      format: 'a',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16"> <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/> <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.removeLink();
        } else {
          let value = prompt('url');
          if (!value) return;
          squire.makeLink(value);
        }
      },
    },
    {
      name: "remove_formatting",
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"> <path d="M13.2 6a1 1 0 0 1 0 .2l-2.6 10a1 1 0 0 1-1 .8h-.2a.8.8 0 0 1-.8-1l2.6-10H8a1 1 0 1 1 0-2h9a1 1 0 0 1 0 2h-3.8ZM5 18h7a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm13 1.5L16.5 18 15 19.5a.7.7 0 0 1-1-1l1.5-1.5-1.5-1.5a.7.7 0 0 1 1-1l1.5 1.5 1.5-1.5a.7.7 0 0 1 1 1L17.5 17l1.5 1.5a.7.7 0 0 1-1 1Z" fill-rule="evenodd"></path> </svg>`,
      handler(squire) {
        squire!.removeAllFormatting();
      },
    },
  ],
  [
    {
      name: "h1",
      format: 'h1',
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.changeFormat(null, { tag: btn.format! }, undefined, true);
        } else {
          squire.changeFormat({ tag: btn.format! })
        }
      },
    },
    {
      name: "h2",
      format: 'h2',
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.changeFormat(null);
        } else {
          squire.changeFormat({ tag: btn.format! })
        }
      },
    },
    {
      name: "h3",
      format: 'h3',
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.changeFormat(null);
        } else {
          squire.changeFormat({ tag: btn.format! })
        }
      },
    },
    {
      name: "ul",
      format: 'ul',
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.removeList();
        } else {
          squire.makeUnorderedList();
        }
      },
    },
    {
      name: "ol",
      format: 'ol',
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/> <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.removeList();
        } else {
          squire.makeOrderedList();
        }
      },
    },
    {
      name: "quote",
      format: 'blockquote',
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/> </svg>`,
      handler(squire, btn) {
        if (squire.hasFormat(btn.format!)) {
          squire.removeQuote();
        } else {
          squire.increaseQuoteLevel();
        }
      },
    },
    {
      name: "image",
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/> <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/> </svg>`,
      handler(squire) {
        let value = prompt('Source');
        if (!value) return;

        squire!.insertImage(value, {});
      },
    },
  ],
  [
    {
      name: "undo",
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/> <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/> </svg>`,
      handler(squire) {
        squire.undo();
      },
    },
    {
      name: "redo",
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/> <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/> </svg>`,
      handler(squire) {
        squire.redo();
      },
    },
    {
      name: "html",
      icon: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5Zm-9.736 7.35v3.999h-.791v-1.714H1.79v1.714H1V11.85h.791v1.626h1.682V11.85h.79Zm2.251.662v3.337h-.794v-3.337H4.588v-.662h3.064v.662H6.515Zm2.176 3.337v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H9.93L8.79 11.85h-.805v3.999h.706Zm4.71-.674h1.696v.674H12.61V11.85h.79v3.325Z"/> </svg>`,
      handler(squire, _, event) {
        const target = event.currentTarget as HTMLDivElement;
        const rootEl = target.closest('squire-editor')!;

        const textarea = rootEl.querySelector('textarea')!;
        const editor = rootEl.querySelector('.squire-input')! as HTMLDivElement;
        const buttons = rootEl.querySelectorAll('.squire-toolbar button')! as NodeListOf<HTMLButtonElement>;

        if (textarea.hasAttribute("hidden")) {
          editor.setAttribute("hidden", "");
          textarea.removeAttribute("hidden");

          // disable all editor buttons
          buttons.forEach(btn => {
            if (btn != event.currentTarget) {
              btn.setAttribute("disabled", "disabled");
              btn.classList.remove("is-active");
            }
          });
        } else {
          // Inject html back in
          squire!.setHTML(textarea.value);

          textarea.setAttribute("hidden", "");
          editor.removeAttribute("hidden");

          // enable all editor buttons
          buttons.forEach(btn => {
            btn.removeAttribute("disabled");
          });
        }
      },
    },
  ],
];

@customElement('squire-editor')
export class SquireEditor extends LitElement {
  @property({ type: Array })
  buttons: String[] = [];

  @property({ type: Boolean })
  allowPaste = false

  
  public set value(html : string) {
    this._squire!.setHTML(html);
  }
  
  public get value() : string {
    return this._squire!.getHTML();
  }
  
  @state()
  private _squire: Squire | undefined;

  firstUpdated() {
    this.initSquire();
  }

  initSquire() {
    this._squire = new Squire(this.renderRoot.querySelector('.squire-input')!, {
      sanitizeToDOMFragment: (html) => sanitize(html, { RETURN_DOM_FRAGMENT: true }),
    });

    const squire = this._squire!;
    const textarea = this.renderRoot.querySelector('textarea')!;
    const buttons = this.renderRoot.querySelectorAll('.squire-toolbar button')! as NodeListOf<HTMLButtonElement>;

    squire.setHTML(textarea.value);
    squire.addEventListener("input", () => {
      this.dispatchEvent(new InputEvent("input", {bubbles: true, composed: true}));
      textarea.value = squire.getHTML();
    });
    squire.addEventListener("blur", () => this.dispatchEvent(new FocusEvent("blur", {bubbles: true, composed: true})));
    squire.addEventListener("cursor", () => {
      // Check which formatting options are enabled ?
      buttons.forEach(btn => {
        if (!btn.dataset.format) return;

        if (squire.hasFormat(btn.dataset.format!)) {
          btn.classList.add("is-active");
          return;
        }

        btn.classList.remove("is-active");
      });
    });

    // Opt out
    if (this.allowPaste) {
      squire.addEventListener("pasteImage", (event: any) => {
        const items = [...event.detail.clipboardData.items];
        const imageItems = items.filter((item) => /image/.test(item.type));
        if (!imageItems.length) {
          return false;
        }

        let reader = new FileReader();
        reader.onload = (loadEvent) => {
          const data = "" + loadEvent?.target?.result;

          var image = new Image();
          image.src = data;
          image.onload = function () {
            squire.insertImage(data, {});
          };
        };
        reader.readAsDataURL(imageItems[0].getAsFile());
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this._squire?.destroy();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="squire-toolbar">
        ${buttons.map(gr => {
          return html`<div class="squire-toolbar-group">
              ${gr.map(b => {
                if (this.buttons.length && !this.buttons.find(btn => btn == b.name)) return;
                return html`
                  <button 
                    aria-label="${b.name}"
                    data-format="${b.format}"
                    @mousedown=${(ev: MouseEvent) => ev.preventDefault()}
                    @click=${(ev: PointerEvent) => b.handler(this._squire!, b, ev)}
                  >
                    ${unsafeHTML(b.icon)}
                  </button>`
              })}
          </div>`
        }
      )}
      </div>
      <textarea title="Raw input" name="squire-raw-input" placeholder="No content yet..." hidden></textarea>
      <div class="squire-input"></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'squire-editor': SquireEditor
  }
}
