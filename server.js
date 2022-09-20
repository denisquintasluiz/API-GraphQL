//chamando o servidor apollo
const { ApolloServer } = require("apollo-server");

//definindo os tipos dos modelos de dados
const typeDefs = `

    type Channel {
        idChannel: Int
        name: String
        playlists: [Playlist]
    }

    type Playlist {
        idPlaylist: Int
        idChannel: Int
        description: String
        videos: [Video]
    }

    type Query {
         channels(idChannel: Int): [Channel]
    }

    type Video {
        idVideo: Int
        title: String
    }

    input ChannelInput {
        idChannel: Int
        name: String
    }

    type Mutation {
        saveChannel(channel: ChannelInput): Channel
    }
`;

//array de Channels
const channels = [
    {idChannel: 1, name: "RocketSeat"},
    {idChannel: 2, name: "FullCycle"},
    {idChannel: 3, name: "Rodrigo Branas"},
]

//array de Playlists
const playlists = [
    {idPlaylist: 1, idChannel: 1, description: "NLw Esports"},
    {idPlaylist: 2, idChannel: 3, description: "JavaScript"},
    {idPlaylist: 3, idChannel: 3, description: "NodeJS"},
    {idPlaylist: 4, idChannel: 2, description: "Arquitetura de Software"},
]


//array de Videos
const videos = [
    {idVideo: 1, idPlaylist: 1,title: "Building Base"},
    {idVideo: 2, idPlaylist: 2,title: " Introdução ao ExpressJS"},
    {idVideo: 3, idPlaylist: 2,title: "DDD"},
]

//definindo os resolvers das querys
const resolvers = {
    Query: {
        channels(obj, args){
            return channels.filter((channel) => !args.idChannel || channel.idChannel === args.idChannel);
        }
    }, 
    Mutation: {
        saveChannel(obj, args){
            const {name, idChannel} = args.channel;

            channels.push(...channels,{idChannel, name});
            
            return channels[channels.length-1];
        }
    },
    Channel: {
        playlists(obj, args) {
            const idChannel = obj.idChannel;
            return playlists.filter((playlists) => playlists.idChannel === idChannel)
        }
    },

    Playlist: {
        videos(obj, args){
            const idPlaylist = obj.idPlaylist;
            return videos.filter((video) => video.idPlaylist === idPlaylist)
        }
    }

};

//estanciando o servidor apollo
const server = new ApolloServer({typeDefs, resolvers});

//Abrindo a porta de atendimento do servidor
server.listen(3000);
