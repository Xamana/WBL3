import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './prompt.tpl.html';
import { PromptType } from './types';

export class Prompt {
  view: View;
  prompts: PromptType[];

  constructor(prompts: PromptType[]) {
    this.prompts = prompts;
    this.view = new ViewTemplate(html).cloneView();
    console.log(this.prompts)
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  render() {
    console.log(this.view)
    this.prompts.forEach((prompt, i) => {
        this.view[`prompt${i+1}`].setAttribute('href', `${prompt.href}`)
        this.view[`prompt${i+1}`].querySelector('.prompt__gradient-text').innerText = prompt.text;
        this.view[`prompt${i+1}`].onclick = this._clickPrompt.bind(this);
    })
  }

  private _clickPrompt(e: Event) {
  }
}
