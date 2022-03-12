
const ap = (apilink , callback) => {
 fetch (apilink).then((x) =>{
    x.json().then(
         result => callback(result,false)) 
         .catch((e)=> { callback(false,e.message)} )
    }).catch ((e)=>{ callback(false, e.message)})
}


const  newelements =(parent , Elements , text , classes , attrbute) => {
        const ele = decument.createElement(Elements)
        parent.appendChild(ele)
        if (text) ele.innerText = text
        if (classes) ele.className = classes
        if (attrbute) {ele.setAttribute(attrbute.key,attrbute.val)
        }
         return ele };

         const article = document.getElementById("article");

         ap("https://newsapi.org/v2/everything?q=tesla&from=2022-02-11&sortBy=publishedAt&apiKey=ba2f20b8dd934af0b8184465fc87f8ea",
          (result, error) => {
                 //console.log(result);
                if (result) {
                   console.log(result.articles);
                   result.articles.forEach( (art,i) => {
                        console.log(typeof(art) +" "+ i);
                        const card = newelements (article, "div", null, "card", { key: "style", val: "width:80vw;" })
                        const author = newelements(card, "h6", art.author ?? "no author", "card-body", null)
                        const img = newelements(card, "img", null, "card-img-top w-75", { key: "src", val: art.urlToImage ?? "error" })
                        const cardBody = newelements(card, "div", null, "card-body", null)
                        const h5 = newelements(cardBody, "h5", art.title, "card-title", null)
                        const p = newelements(cardBody, "p", art.description, "card-text", null)
                        const a = newelements(cardBody, "a", "المصدر", "btn btn-primary", { key: "href", val: art.url })
                        a.setAttribute("target", "_blank")
                        const p2 = newelements(cardBody, "p", art.publishedAt, "card-text", null)
            
                    });
                 
                }
                else if (false) {
                        console.log(error);
                    }
            })


    
