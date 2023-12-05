import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';
import { userService } from '../../services/user.service'

import { ProductList } from '../productList/productList';
import { Prompt } from '../prompt/prompt'

const promptData = [
  {
      id: 1,
      href: '/prompt1',
      text: 'чехол iphone 13 pro'
  },
  {
      id: 2,
      href: '/prompt2',
      text: 'коляски agex'
  },
  {
      id: 3,
      href: '/prompt3',
      text: 'яндекс станция 2'
  },
]

class Homepage extends Component {
  popularProducts: ProductList;
  searchPrompt: Prompt;
  userId: Promise<string>;

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.searchPrompt = new Prompt(promptData);

    this.popularProducts.attach(this.view.popular);
    this.searchPrompt.attach(this.view.prompt);

    this.userId = userService.getId();
  }

  async render() {
    fetch('/api/getPopularProducts', {
        headers: {
          'x-userid': await this.userId
        }
  })
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    this.searchPrompt.render();

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }
  }
}

export const homepageComp = new Homepage(html);
