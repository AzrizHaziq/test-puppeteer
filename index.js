import puppeteer from 'puppeteer'
;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  console.log('before goto')

  await page.goto(
    'https://www.bursamalaysia.com/market_information/shariah_compliant_equities_prices?top_stock=top_active&per_page=50&page=1',
    {
      waitUntil: 'networkidle0',
    }
  )

  console.log('after goto')

  await page.waitForSelector('.pagination li [data-val]')
  const pagination = await page.$$('.pagination li [data-val]')

  let temp = []
  for await (let page of pagination) {
    const textContent = await page.evaluate(el => el.textContent)
    temp.push(textContent)
  }

  const maxPages = Math.max(...temp.filter(Boolean).map(parseFloat))
  console.log(maxPages)

  // const def = await page.evaluate(() => {
  //   document.querySelector('#DataTables_Table_0_paginate > ul.pagination').scrollIntoView();

  // return Array.from(document.querySelectorAll('#DataTables_Table_0_paginate > ul.pagination'))
  //   .map(i => i.textContent)
  //   .filter(Boolean)
  //   .join(', ')
  // return document.title;
  // return document.querySelector("#navbarDropdown").textContent
  // })

  // console.log('bursamalaysia', def)

  await browser.close()
})()

// https://www.bursamalaysia.com/market_information/shariah_compliant_equities_prices?top_stock=top_active&per_page=50&page=1
