import Axios from "axios";
import queryString from 'query-string'

const github = Axios.create({
  baseURL: 'https://api.github.com/user'
})

export async function login(code) {
  console.info(`Sending login with access_code ${code}`)
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env
  console.info(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET)
  const resp = await Axios.post('https://github.com/login/oauth/access_token', {
    code,
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET
  })

  console.info(`Response ${resp.data}`)
  return queryString.parse(resp.data)
}

export async function getEvents(userName, repoName){
  console.log(`/repos/${userName}/${repoName}/events`)
  const { data } =  await github.get(`/repos/${userName}/${repoName}/events`)
  return data
}

export async function getRepositories(token) {
  const { data } = await github.get(`/repos`, { headers: getHeaders(token) })
  return data
}

export async function getUser(token) {
  const { data } = await github.get(null, { headers: getHeaders(token) })
  return data
}

function getHeaders(token) {
  return {
    'Authorization': `token ${token}`
  }
}