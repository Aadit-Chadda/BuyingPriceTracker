import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());


const url = "https://m.shein.com/ca/1pc-Four-Seasons-Plush-Polyester-Shaped-Flower-Happy-Letter-Cartoon-Print-Anti-slip-Tpr-Bottom-Soft-Absorbent-Comfortable-Machine-hand-Washable-Easy-To-Clean-Suitable-For-Sink-Shower-Bathtub-Bathroom-Mat-p-20984948.html?mallCode=1&imgRatio=3-4&src_module=home&src_identifier=on%3DIMAGE_CAROUSEL_COMPONENT%60cn%3Dshopbycate%60hz%3D0%60ps%3D3_1_10%60jc%3Dreal_2300&src_tab_page_id=page_home1716219111380&showFeedbackRec=1&pageListType=4";

const shein = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36');
    
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // get the title of the product
    const title = await page.evaluate(() => {
        const element = document.querySelector('.detail-title-h1 .detail-title-text');
        return element ? element.innerText.trim() : 'Title not found';
      });
      console.log("Title: ", title);

    // get the price of the product
    const price = await page.evaluate(() => {
        const element = document.querySelector('.goods-price__main');
        return element ? element.innerText.trim() : 'Price not found';
    });
    console.log("Price: ", price);

    // get the image of the product
    const image = await page.evaluate(() => {
        const element = document.querySelector('.crop-image-container__img.fsp-element');
        return element ? element.src : 'image not found';
      });
      console.log("Image URL: ", image);
    
    await browser.close();
}

shein();

