import puppeteer from "puppeteer";

const url = "https://www.amazon.ca/dp/0141395877/?coliid=I3VYR3SQIF0S9E&colid=369R5L553HEYC&psc=1&ref_=list_c_wl_lv_ov_lig_dp_it";

const amazon = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // get the title of the product
    const htmlTitle = await page.$("#productTitle");
    const title = await htmlTitle.evaluate(el => el.innerHTML);
    console.log("Title: ", title);

    // get the price of the product
    const htmlPrice = await page.$(".aok-offscreen");
    const price = await htmlPrice.evaluate(el => el.innerHTML);
    console.log("Price: ", price);

    // get the image of the product
    const htmlImage = await page.$("#landingImage");
    const image = await htmlImage.evaluate(el => el.src);
    console.log("Image URL: ", image);

    await browser.close();
}

amazon();
