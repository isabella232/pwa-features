import { LitElement, css, html, customElement, property } from 'lit-element';
import { getADemo } from '../services/data';

import '../components/comp-toast';
import '../components/share-button';
import '../components/browser-support';

import { Router } from '@vaadin/router';
import { handleMarkdown } from '../services/detail';
import { doCapture } from '../services/analytics';


@customElement('demo-detail')
export class DemoDetail extends LitElement {

  @property({ type: Object }) demo: any = null;
  @property({ type: String }) readme: string | null = null;

  static get styles() {
    return css`
      #headerBlock {
        margin-left: 3em;
        color: black;
        margin-top: 48px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 10em;
      }

      #headerBlock p {
        max-width: 34em;
      }

      #headerBlock h2 {
        margin-top: 0;
      }

      #demoMain {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      #liveButton {
        border-radius: 20px;
        background: rgb(147, 55, 216);
        color: white;
        border: none;
        font-weight: bold;
        font-size: 14px;
        padding: 10px;
        padding-left: 14px;
        padding-right: 14px;

        text-decoration: none;

        cursor: pointer;

        display: inline-flex;
        margin-right: 4px;
        width: 7em;
        justify-content: center;
      }

      #learnMoreButton {
        border-radius: 20px;
        background: black;
        color: white;
        border: none;
        font-weight: bold;
        font-size: 14px;
        padding: 10px;
        padding-left: 14px;
        padding-right: 14px;

        text-decoration: none;

        cursor: pointer;

        display: inline-flex;
        width: 7em;
        justify-content: space-between;

        margin-top: 14px;
      }

      #learnMoreButton img {
        width: 1.2em;
        height: 1.2em;
      }

      #installOptions {
        background: white;
        display: flex;
        flex-direction: column;
        border-radius: 0px 0px 6px 6px;
        padding: 5px;

        padding-left: 12px;
        align-items: flex-start;
        border-radius: 6px;
        margin-left: 1.8em;
        width: 10em;
        box-shadow: 0 0 4px 1px rgba(0,0,0,.18039);
        justify-content: flex-start;

        animation-name: appear;
        animation-duration: 200ms;
      }

      #installOptions button {
        height: 40px;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        background: none;
        color: #000;
        padding-left: 0;
        padding-right: 0;
        width: initial;
        border: none;
        cursor: pointer;

        width: 100%;
        text-align: start;
      }

      #compDetail {
        padding: 14px;
      }

      #actions {
        align-self: end;
        display: flex;
      }

      #actions button, #actions a {
        color: black;
        padding: 10px;
        background: transparent;
        border: 1px solid black;
        border-radius: 24px;
        font-size: 14px;
        font-weight: 700;
        width: 6em;
        margin-right: 10px;
        cursor: pointer;

        display: flex;
        justify-content: center;
      }

      #actions a {
        width: 4em;
        text-decoration: none;
      }

      #demo {
        display: flex;
        margin-top: 2em;
        margin-bottom: 4em;

        flex-direction: column;
        align-items: start;
        margin-left: 9em;
        margin-right: 10em;
        color: black;
      }

      #demo img {
        width: 100%;
        height: 30em;
        object-fit: contain;

        background: white;
        border-radius: 12px;
        padding-bottom: 18px;
        padding-top: 18px;
      }

      #readme {
        background: white;
        padding: 20px;
        border-radius: 12px;
        margin-top: 2em;
        margin-left: 9em;
        margin-right: 9em;
        overflow: auto;
      }

      #backButtonBlock {
        margin-right: 2em;
      }

      #backButton {
        height: 4em;
        border: none;
        background: white;
        border-radius: 50%;
        padding: 15%;
        width: 4em;
        cursor: pointer;
      }

      #backButton img {
        height: 100%;
        width: 100%;
      }

      #headerInfoBlock {
        display: flex;
        flex-direction: row;
        align-items: start;
      }

      #mobileDemoVid {
        display: none;
      }

      @media(max-width: 800px) {
        #headerBlock, #demo, #readme {
          margin-left: 0;
          margin-right: 0;
        }

        #headerBlock {
          flex-direction: column;
        }

        #backButtonBlock {
          margin-right: 1em;
        }

        #demo iframe {
          width: 100%;
        }

        #actions {
          margin-top: 1em;
          margin-left: 4.4em;
        }

        #desktopDemoVid {
          display: none;
        }

        #mobileDemoVid {
          display: block;
          border-radius: 8px;
          width: 100%;
          margin-top: 2em;
        }
      }

      @keyframes appear {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    this.demo = await getADemo((location.pathname.split("/").pop() as string));
    console.log(this.demo);

    if (this.demo.more_info) {
      const markdownData = await handleMarkdown(`/data/markdown/${this.demo.more_info}`);

      if (markdownData) {
        this.readme = markdownData;
      }
    }

    // analytics
    const config =  {
      uri: window.location.href,
      pageName: `${this.demo?.name}`,
      pageHeight: window.innerHeight
    }
    doCapture(config);
  }

  goBack() {
    Router.go('/?cat=demos');
  }

  render() {
    return html`
    <link rel="stylesheet"
      href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.1/build/styles/default.min.css">
      
      <meta property="og:title" content="${this.demo?.name}">
      <meta property="og:description" content="Check out this demo on PWABuilder.">
      <meta property="og:image" content="${this.demo?.screenshot_url}">
      <meta property="og:url" content="${location.href}">
      <meta name="twitter:card" content="summary_large_image">

      <div id="compDetail">

        <section id="headerBlock">
          <div id="headerInfoBlock">

            <div id="backButtonBlock">
              <button @click="${() => this.goBack()}" id="backButton" aria-label="Back">
                <img src="/assets/back.svg" alt="back icon">
              </button>
            </div>

            <div id="demoMain">
              <div>
                <h2>${this.demo?.name}</h2>

                <p>${this.demo?.desc}</P>

                ${this.demo?.video_url ? html`<iframe id="desktopDemoVid" width="560" height="315" src="${this.demo?.video_url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : null }
              </div>

              <div>
                <a .href="${this.demo?.demo_url}" id="liveButton" target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>

                <a .href="${this.demo?.learn_more}" id="learnMoreButton" target="_blank" rel="noopener noreferrer">
                  Learn More

                  <img src="/assets/link.svg" alt="link icon">
                </a>
              </div>
            </div>
          </div>

          <div id="actions">
            <share-button></share-button>
            <a .href="${this.demo?.spec_url}" target="_blank" rel="noopener noreferrer">Spec</a>
            <a .href="${this.demo?.github_url}" target="_blank" rel="noopener noreferrer">Code</a>
          </div>
        </section>

        ${!this.demo?.video_url && this.demo?.screenshot_url ? html`<section id="demo">
          <img .src="${this.demo?.screenshot_url}" alt="screenshot of demo" tabindex="0">
        </section>` : null}

        ${this.demo?.video_url ? html`<iframe tabindex="0" id="mobileDemoVid" width="560" height="315" src="${this.demo?.video_url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : null}

        ${
          this.demo?.support ? html`
            <section id="support">
              <browser-support .supportData="${this.demo?.support}" tabindex="0"></browser-support>
            </section>
          ` : null
        }

        ${this.readme ? html`<section id="readme" .innerHTML="${this.readme}" tabindex="0"></section>` : null}
      </div>
    `;
  }
}