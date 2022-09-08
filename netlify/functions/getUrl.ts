import { Handler } from "@netlify/functions";
import axios from "axios";
import ytdl from "ytdl-core";

const handler: Handler = async (event, context) => {
    let videoId = event.queryStringParameters.id;
    let info = await ytdl.getInfo(videoId);
    let format = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
    if (format == null) {
        return {
            statusCode: 200,
            body: JSON.stringify({ url: null }),
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ url: format.url }),
    };
};

export { handler };