import ElasticSearch from 'elasticsearch'

const client = new ElasticSearch.Client({
    host: 'localhost:9200',
    log: 'trace'
})

export async function createMessage({_id, content, user, sentAt, savedAt, threadId, eventId, url }) {

    await client.create({
        index: 'message',
        type: 'message',
        id: String(_id),
        body: { content, user, sentAt, savedAt, threadId, eventId, url }
      });
}

export async function searchMessages(content, threadId) {
    const messages = await client.search({
        index: 'message',
        body: {
            query: {
                bool: {
                    must: [
                        { match: { content } },
                        { match: { threadId } }
                    ]
                }
            }
        }
    })

    return messages.hits.hits.map(({_source, _id}) => {
        _source._id = _id
        return _source
    })
}