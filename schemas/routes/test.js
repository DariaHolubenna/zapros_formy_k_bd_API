const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    author: {
      type: 'string',
      require: 'true',
    },
    content: { type: 'string' }
  },
  additionalProperties: false,
}


module.exports = schema;
