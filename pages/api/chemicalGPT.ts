import type { NextRequest } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
})

const openai = new OpenAIApi(configuration);

export const config = {
    runtime: 'edge',
}

export default async function handler(req: NextRequest) {
    if (req.method === "POST") {
        let message = `Provide safety information, reaction information, and required equipment/PPE when using ${req.body}? Format the response as json with keys of Safety, Reactions, and Equipment, with each key corresponding to an array of points for each.`

        const chatGPT = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.2,
            messages: [{role: "user", content: message}]
        })

        const chatGPTMessage = chatGPT.data.choices[0].message;
        console.log(chatGPTMessage?.content)
        return new Response(chatGPTMessage?.content)
    }
}