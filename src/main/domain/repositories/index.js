import * as github from '../../infra/github'

export async function getRepositories (token) {
    return github.getRepositories(token)
}