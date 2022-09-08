import { Handler } from "@netlify/functions";
import axios from "axios";

const handler: Handler = async (event, context) => {
    let playlistUrl = event.queryStringParameters.id;

    let rp = await axios.get(playlistUrl);
    let body = rp.data
    let start = body.indexOf("var ytInitialData = ");
    let end = body.indexOf("</script>", start);
    let obj = body.substring(start + 20, end - 1);
    let ytdata = JSON.parse(obj);
    if (ytdata.contents == undefined) {
        return {
            statusCode: 200,
            body: null,
        };
    }
    let data = ytdata.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
    let playlist = [];
    for (const item of data) {
        playlist.push({
            title: item.playlistVideoRenderer.title.runs[0].text,
            artwork: item.playlistVideoRenderer.thumbnail.thumbnails[0].url.split('?')[0],
            videoId: item.playlistVideoRenderer.videoId,
            artist: item.playlistVideoRenderer.shortBylineText.runs[0].text,
        });
    }
    return {
        statusCode: 200,
        body: JSON.stringify(playlist),
    };
};

export { handler };