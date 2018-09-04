import Axios from "axios";
import queryString from 'query-string'

const github = Axios.create({
    baseURL: 'https://api.github.com/user'
})

export async function login(code) {
    const {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET} = process.env
    const resp = await Axios.post('https://github.com/login/oauth/access_token', {
        code,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET
    })

    return queryString.parse(resp.data)
}

export async function getRepositories(token) {
    const {data} = await github.get('/repos', {headers: getHeaders(token)})
    return data
}

function getHeaders(token) {
    return {
        'Authorization': `token ${token}`
    }
}