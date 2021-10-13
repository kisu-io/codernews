const API_KEY = 'c475845155b4490fbfb41975034d2457';
const baseUrl = 'https://newsapi.org/v2';
const path = "/top-headlines?country=us"
const query = `&apiKey=${API_KEY}`

// const fetchData = () => {
//     const url = baseUrl + path + query;
//     const fromFetch = fetch(url);
//     fromFetch.then((success) => {
//             return success.json();
//         })
//         .then((xxx) => {
//             console.log(xxx);
//         });
// };
// fetchData()

const fetchAsync = async() => {
    const url = baseUrl + path + query;
    let response = await fetch(url);
    let data = await response.json();
    const articles = data.articles;
    const totalArticales = data.totalArticles;
    const htmlTitleArea = document.getElementById("titleArea");
    const htmlOutput = articles.map((singleArticle) => {
        return renderArticle(singleArticle);
    });
    htmlTitleArea.innerHTML = htmlOutput.join(" ");

    return;
};

function renderArticle(article) {
    return `
    <li class="mb-3 align-self-center article">
      <div class="img-container">
        <h1 class="font-weight-bold">${article.title}</h1>
        <img src="${article.urlToImage}" alt="Snow" />
      </div>
      <hr class="mt-4" />
      <div class="d-flex align-items-center">
        <i class="fa fa-edit"></i>
        <p class="mb-0">${article.author}</p>
      </div>
      <hr />
      <div class="d-flex align-items-center justify-content-between">
        <p class="mb-0"><a href="${article.url}">${article.source.name}</a></p>
        <p class="mb-0"><i class="fa fa-calendar"></i>${moment(
            article.publishedAt,
          ).format("LLL")}</p>
      </div>
      <hr />
      <p class="mt-3"><i class="fa fa-envelope"></i>${article.content}</p>
    </li>
  `;
}

fetchAsync();

const languages = [
    "de",
    "es",
    "he",
    "it",
    "nl",
    "no",
    "pt",
    "ru",
];

function renderLanguageList() {
    const anchorTags = []
    for (const language of languages) {
        anchorTags.push(
            `<a class="btn btn-light ml-0.1" href="http://127.0.0.1:5500/index.html?language=${language}">${language}</a>`,
        );
        console.log(language);

    }
    document.getElementById("languages").innerHTML = anchorTags.join(" ");
}

renderLanguageList()