// Get Quotes from API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


//Show New Quote
function newQuote() {
    loading();
    //Pick Random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if Author fiels is blank and replace it with "Unknown"
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //Check Quotes length to determine the styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    complete();
    console.log(quote);
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        //Catch Error Here
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${ quoteText.textContent } - ${ authorText.textContent }`;
    window.open(twitterUrl, '_blank')
}


//Background image
function randomImg() {
    document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/random>';
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
newQuoteBtn.addEventListener('click', randomImg)
twitterBtn.addEventListener('click', tweetQuote)

//On Load
getQuotes()