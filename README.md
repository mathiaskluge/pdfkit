# pdfkit
testing pdf rendering with pdfkit

# How to use

Installs missing dependencies and ensures `pdfkit` and `pdfkit image-size` (for logo scaling) is installed
```
npm run setup
```
Generates an `invoice.pdf` at root from `invoice.js`
```
npm run start
```
# Notes
* did not figure out proper point/dpi conversion for precise logo scaling boundaries. What is in there is trial/error until this one fit
* table alignment was also to much for time I had and time of day...

# Key Challenges
* Proper floating layout: Header/Footer should take up fixed areas of the page so that rest is reserved for item list + Totals
  * based on rendered size of item list a decision need to be made to create a second page and split item list
  * Always the last line item at minimum should be carried over with a table header and the totals block to the next page
  * needs to function generically for an indefinite amount of pages...
  * Should be dynamic in a way that if later on header/footer size is increased (and therefore list area shrinks) everything still works
* make it possible to render a fullscale svg over the entire pare background to support some sort of theming

