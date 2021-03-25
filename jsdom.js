import { JSDOM } from 'jsdom'
import fetch from 'isomorphic-fetch'
;(async () => {
  const res = await fetch(
    'https://www.bursamalaysia.com/market_information/shariah_compliant_equities_prices?top_stock=top_active&per_page=50&page=1'
  )
  const dom = await res.text()
  const { document } = new JSDOM(dom, {
    url: 'https://www.bursamalaysia.com',
    referrer: 'https://www.bursamalaysia.com',
  }).window

  const pagination = Array.from(document.querySelectorAll('.pagination li [data-val]'))
    .map(i => i.textContent)
    .filter(Boolean)
    .map(parseFloat)

  const maxPageNumber = Math.max(...pagination)
  console.log(maxPageNumber)
})()
;(async () => {
  const dom = await JSDOM.fromURL(
    'https://www.bursamalaysia.com/market_information/shariah_compliant_equities_prices?top_stock=top_active&per_page=50&page=1'
  )

  const { document } = new JSDOM(dom.serialize()).window
  const pagination = Array.from(document.querySelectorAll('.pagination li [data-val]'))
    .map(i => i.textContent)
    .filter(Boolean)
    .map(parseFloat)

  const maxPageNumber = Math.max(...pagination)
  console.log(maxPageNumber)
})()
