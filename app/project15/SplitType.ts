export class SplitType {
  public words: HTMLElement[] = [];
  private originalHTML: string;
  private element: any;

  constructor(nameClone: HTMLElement | string, options: { types: string }) {
    const element =
      typeof nameClone === 'string'
        ? document.querySelector(nameClone)
        : nameClone;

    if (!element) throw new Error('Invalid element passed to SplitType');

    this.element = element;
    this.originalHTML = element.innerHTML; // ✅ Save original DOM

    const text = element.textContent || '';
    const wordArray = text.trim().split(/\s+/); // more robust split

    element.innerHTML = ''; // clear it first
    this.words = wordArray.map((word) => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.style.display = 'inline-block';
      element.appendChild(span);
      return span;
    });
  }

  /**
   * Restore the original DOM content
   */
  public revert(): void {
    this.element.innerHTML = this.originalHTML;
  }
}
