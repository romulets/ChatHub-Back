import * as github from '../../infra/github'
import User from './model'
import { syncRepositories } from '../repositories';

export async function loginAndSync(code) {
  const loginResp = await github.login(code)

  if (loginResp.error) {
    throw new Error(loginResp.error)
  }

  const token = loginResp.access_token
  const remoteUser = await github.getUser(token)
  const user = await createUserIfNotExists(remoteUser)

  const repositories = await syncRepositories(user, token)

  user.repositories = repositories.map(r => r._id)
  user.save()

  user.token = token
  return user
}

async function createUserIfNotExists(remoteUser) {
  var user = await findUserByUsername(remoteUser.username)

  if (!user) {
    user = createUserFromGithubUser(remoteUser)    
    user.save()
  }

  return user
}

function createUserFromGithubUser({ id: githubId, login: username, name, html_url: url, avatar_url: avatarUrl }) {
  return new User({
    username,
    githubId,
    name,
    url,
    avatarUrl
  })
}

async function findUserByUsername(username) {
  return await User.findOne({ username })
}