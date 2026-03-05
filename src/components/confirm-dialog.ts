import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared-styles';

/**
 * Confirmation dialog component
 */
@customElement('mopidy-confirm-dialog')
export class ConfirmDialog extends LitElement {
  static styles = [sharedStyles, css`
    :host {
      display: contents;
    }
  `];

  @property({ type: Boolean }) open = false;
  @property({ type: String }) title = 'Confirm';
  @property({ type: String }) message = '';
  @property({ type: String }) confirmText = 'Confirm';
  @property({ type: String }) cancelText = 'Cancel';
  @property({ type: Boolean }) destructive = false;

  @state() private _resolve?: (value: boolean) => void;

  /**
   * Show the dialog and return a promise that resolves to true (confirm) or false (cancel)
   */
  show(): Promise<boolean> {
    this.open = true;
    return new Promise((resolve) => {
      this._resolve = resolve;
    });
  }

  private _onConfirm() {
    this.open = false;
    this._resolve?.(true);
    this._resolve = undefined;
  }

  private _onCancel() {
    this.open = false;
    this._resolve?.(false);
    this._resolve = undefined;
  }

  private _onClose() {
    this._onCancel();
  }

  render() {
    if (!this.open) return html``;

    return html`
      <ha-dialog
        .open=${this.open}
        @closed=${this._onClose}
        .heading=${this.title}
      >
        <div class="dialog-content">
          <p>${this.message}</p>
        </div>
        <mwc-button
          slot="secondaryAction"
          @click=${this._onCancel}
        >
          ${this.cancelText}
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this._onConfirm}
          .style=${this.destructive ? '--mdc-theme-primary: var(--error-color);' : ''}
        >
          ${this.confirmText}
        </mwc-button>
      </ha-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mopidy-confirm-dialog': ConfirmDialog;
  }
}
