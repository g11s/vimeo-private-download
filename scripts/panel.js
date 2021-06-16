chrome.devtools.network.onRequestFinished.addListener((request) => {
  request.getContent((body) => {
    if (request.request && request.request.url) {
      if (
        request.request.url.includes("app_id") ||
        request.request.url.includes("player.vimeo.com")
      ) {
        let indiceInicio = body.indexOf('"progressive"');

        if (indiceInicio <= 0) {
          return;
        }

        body = body.substring(indiceInicio, body.length);

        let indiceFinal = body.indexOf("}]}");
        body = body.substring(0, indiceFinal + 2);

        let bodyToJson = JSON.parse(`{${body}}`);
        let html = "";

        bodyToJson.progressive.forEach((tela) => {
          html = `${html}<form action="${tela.url}" method="get"><div class="form-group mx-3 my-1"><label htmlFor="quality">Qualidade: ${tela.quality}</label><input type="submit" class="btn btn-success ml-3" value="Baixar"/></div></form>`;
        });

        document.querySelector("#code").innerHTML = html;
      }
    }
  });
});
