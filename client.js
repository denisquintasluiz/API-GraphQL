//chamando o axios
const axios = require("axios");

//funcão que faz a requisição para o servidor QraphQL
const execute = async function (data) {
    try {
        const response = await axios({
            url: "http://localhost:3000",
            method: "post",
            data
        });
        const result = response.data;
        console.log(JSON.stringify(result, undefined, " "));
    } catch (e) {
        console.log(e);
    }
};

//fazendo as consultas
(async function () {
    await execute({
        query: `
            mutation {
                saveChannel(channel: {idChannel: 4, name: "Felipe de Champs"}) {
                    name
                    idChannel
                }
            }   
        `
    });
    await execute({
        query: `
            mutation ($channel: ChannelInput) {
                saveChannel (channel: $channel) {
                    name
                    idChannel
                }
            }   
        `,
        variables: {
            channel: {
                idChannel: 5,
                name: "Loiane Gronner"
            }
        }
    });
     
    await execute({
        query: `
          query {
            channels {
              name
              idChannel
              playlists {
                description
                videos {
                    title
                }
           }
         }
        }
      `
    });
})();
