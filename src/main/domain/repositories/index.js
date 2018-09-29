import * as github from '../../infra/github'
import Repository from './model'
import { findUserById } from '../users';
import { Types } from 'mongoose';
import { saveThread } from '../threads';

export async function syncRepositories(user, token) {
  const remoteRepositories = await github.getRepositories(token)
  return await Promise.all(remoteRepositories.map(createRepositoryIfNotExists))
}

async function createRepositoryIfNotExists(githubRepository) {
  var repository = await findByGithubId(githubRepository.id)

  if (!repository) {
    repository = createFromGithubRepository(githubRepository)
    repository.save()

    await saveThread({
      name: 'Main',
      main: true,
      description: 'Main thread',
      repositoryId: repository._id,
    })
  }

  return repository
}

function createFromGithubRepository({ id: githubId, name, full_name: fullName, description, html_url: url }) {
  console.info(`creating ${githubId}`)
  return new Repository({
    githubId,
    name,
    fullName,
    description,
    url
  })
}

async function findByGithubId(githubId) {
  return await Repository.findOne({ githubId })
}

export async function getRepositories(userId) {
  const user = await findUserById(userId)
  return await Repository.find({
    '_id': { $in: user.repositories.map(Types.ObjectId) }
  })
}

export async function getRepository(userId, repositoryId) {
  const user = await findUserById(userId)
  if (user.repositories.filter(r => r == repositoryId).length === 0) {
    throw new Error('Repository does not belongs to user')
  }

  return await Repository.findById(repositoryId)
}