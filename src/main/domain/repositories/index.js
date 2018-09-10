import * as github from '../../infra/github'
import Repository from './model'

export async function getRepositories (token) {
    return await Repository.find().exec() //github.getRepositories(token)
}

export async function saveRepository (repositoryData) {
    const repos = new Repository(repositoryData)
    return await repos.save()
}