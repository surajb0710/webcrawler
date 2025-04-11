const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true }); // Run in headless mode
  const page = await browser.newPage();

  await page.goto(
    'https://www.amazon.in/kinis-Living-Bedroom-Restaurants-Antique/dp/B0DR2JX8RL/ref=sr_1_6?crid=12P12OQK2MQNW&dib=eyJ2IjoiMSJ9._QcpfUjSzLTWpnPuU3LMNlORcRhf8lNAkKAdySaXo3ZD_NpI-tP4-Fbvstzh59-md1guOOtFIFuOKdO-58MVPE4jV0IvWAqN8PMzDm68jDH_IC96_z5zNSroBzaf3b5KCEiaXMgJbwZk7TcD53sC75u8JaM-q325SnGR2Kp3T1R1SQoLPNsKJ8-gdcyNGXpAegrY-G01x9rXAjfbJxeN1xLAfbSjHBW6puD2BXepUsRATTu8ahOVMiD9y6qd3kEw6V16cdNwY7MAmr2lA1gpGYOq-VPhcXCpzvCqKBdymDOMdfU49ttqWjuJQwvWa6X8pP9EZdjy0LCZPwbp_hJuA-kYn6zjlMIF9o9vD9FG5uQ.ItEzvJ2rQFLPD70jLrBZ5Q9zFjgCdxtkn4LMPbeYPXQ&dib_tag=se&keywords=kinis%2BWall%2BLight%2FWall%2BLamp%2Bto%2BD%C3%A9cor%2BHome%2FLiving%2BRoom%2FBedroom%2FOffice%2FDining%2FCafe%2FRestaurants%2C%2BCycle%2BDesign%2C%2BBlack%2B(Pack%2Bof%2B1%2C%2Bwith%2BBulb)&nsdOptOutParam=true&qid=1743091826&s=kitchen&sprefix=kinis%2Bwall%2Blight%2Fwall%2Blamp%2Bto%2Bd%C3%A9cor%2Bhome%2Fliving%2Broom%2Fbedroom%2Foffice%2Fdining%2Fcafe%2Frestaurants%2C%2Bcycle%2Bdesign%2C%2Bblack%2Bpack%2Bof%2B1%2C%2Bwith%2Bbulb%2B%2Ckitchen%2C204&sr=1-6&th=1'
  ); // Replace with the target URL

  // Extract the page title
  const title = await page.title();
  console.log(`Page Title: ${title}`);

  // Extract text content from an element
  const heading = await page.textContent('p.a-spacing-mini');
  console.log(`Heading: ${heading}`);

  await browser.close();
})();
