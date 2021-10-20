import { LightningElement } from 'lwc';
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';

export default class App extends LightningElement {
    search;
    //connectedCallback() {
    loadalgoliacomponents(event) {
        console.log('this si dom elment ' + this.template.querySelector('div'));
        console.log(algoliasearch);
        this.client = algoliasearch('XQ4FZVC6EV', 'ca262ae0cd15d2b2e5425fe68a81809b');
        //loadScript(this, instantSearchLib).then(() => {
        this.search = instantsearch({
            indexName: 'ProductSiteWarehouseCatalog',
            searchClient: this.client,
        });

        this.search.addWidgets([
            searchBox({
                container: this.template.querySelector('#searchbox'),
            }),

            hits({
                container: this.template.querySelector('#hits'),
                templates: {
                    empty: "No results",
                    item(hit, bindEvent) {
                        const stockStatusClass = hit.StockStatus.replaceAll(' ', '-');

                        return `<div class="card" onclick="sendProdSelEvent('${hit.objectID}','${hit.__position}')">
                    <h4 style=" margin-bottom: 0px; margin-top: 0px; ">
                        <a href="https://shop.sgproof.com/sgws/en/usd/${hit.LiquidName.replaceAll(' ', '-')}/p/${hit.ItemNumber}">
                            ${instantsearch.highlight({ attribute: 'Name', hit })}
                            </a>
                        </h4>
                    <div class="grid-container">
                        <div  class="grid-item">
                            <img src="${hit.ImageUrl}" style="width: 100px;" onerror="onImgError(this)" fallback="${hit.DefaultImageURL}">
                        </div>
                        <div class="grid-item">                                                                               
                            <table style="border-collapse: collapse; width: 100%; height: 90px;">
                                <tbody>
                                    <tr style="height: 18px;">
                                        <td style="width: 50%; height: 18px;"><div class="itemDesc">Item ID</div></td>
                                        <td style="width: 75%; text-align: left; height: 18px;"><div class="itemDescVal" style="width: 120px;">${instantsearch.highlight({ attribute: 'ItemNumber', hit })}<div></td>                                                                    
                                    </tr>
                                    <!-- <tr style="height: 18px;">
                                        <td style="width: 50%; height: 18px;"><div class="itemDesc">Stock</div></td>
                                        <td style="width: 75%; height: 18px;"><div class="itemDescVal" style="width: 120px;">${instantsearch.highlight({ attribute: 'StockStatus', hit })} (${hit.InvCaseOnHand}/${hit.InvBottleOnHand})<div></td>
                                    </tr>-->
                                    <tr style="height: 18px;">
                                        <td style="width: 50%; height: 18px;"><div class="itemDesc">Sales YOY</div></td>
                                        <td style="width: 75%; height: 18px;"><div class="itemDescVal" style="width: 120px;">${instantsearch.highlight({ attribute: 'SalesYOY', hit })}<div></td>
                                    </tr>
                                    <tr style="height: 18px;">
                                        <td style="width: 50%; height: 18px;"><div class="itemDesc">Brand</div></td>
                                        <td style="width: 75%; height: 18px;"><div class="itemDescVal" style="width: 120px;">${instantsearch.highlight({ attribute: 'Brand', hit })}<div></td>
                                    </tr>
                                    <tr style="height: 18px;">
                                        <td style="width: 50%; height: 18px;"><div class="itemDesc">Price</div></td>
                                        <td style="width: 75%; height: 18px;"><div class="itemDescVal" style="width: 120px;">\$${instantsearch.highlight({ attribute: 'FLPrice1', hit })}<div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                    </div>
                    <div class="grid-container">
                        <div class="grid-item">
                            <button style="border-radius: 5px" onclick="sendAddToCartEvent('${hit.objectID}','${hit.__position}')">Add to Cart</button> 
                        </div>
                        <div class="grid-item">
                            <tb/><span class="stock-status-pill stock-${stockStatusClass}">${hit.StockStatus} (${hit.InvCaseOnHand}/${hit.InvBottleOnHand})</span>
                        </div>
                    </div>
                </div>`;
                    }
                }
            })
        ]);

        this.search.start();
    }

}