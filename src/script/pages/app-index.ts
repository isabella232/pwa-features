import { LitElement, css, html, customElement } from 'lit-element';

import './app-home';

import { Router } from '@vaadin/router';

import '../components/header';

import { initAnalytics } from '../services/analytics';


@customElement('app-index')
export class AppIndex extends LitElement {

  static get styles() {
    return css`

    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#routerOutlet'));
    router.setRoutes([
      { path: '/', component: 'app-home' },
      {
        path: '/component/:id', component: 'comp-detail',
        action: async () => {
          await import('./comp-detail.js');
        },
      },
      {
        path: '/demo/:id', component: 'demo-detail',
        action: async () => {
          await import('./demo-detail.js');
        },
      },
      {
        path: "/about",
        component: "app-about",
        action: async () => {
          await import('./app-about.js');
        },
      }
    ]);

    // init analytics
    initAnalytics();
  }

  render() {
    return html`
      <div>
        <app-header></app-header>
        <main role="presentation">
          <div id="routerOutlet"></div>
        </main>
      </div>
    `;
  }
}