import pureAnnotation from './visitors/pure'
import minify from './visitors/minify'
import displayNameAndId from './visitors/displayNameAndId'
import templateLiterals from './visitors/templateLiterals'
import assignStyledRequired from './visitors/assignStyledRequired'

export default function({ types: t }) {
  return {
    visitor: {
      CallExpression(path, state) {
        displayNameAndId(t)(path, state)
        pureAnnotation(t)(path, state)
      },
      TaggedTemplateExpression(path, state) {
        minify(t)(path, state)
        displayNameAndId(t)(path, state)
        templateLiterals(t)(path, state)
        pureAnnotation(t)(path, state)
      },
      VariableDeclarator(path, state) {
        assignStyledRequired(t)(path, state)
      },
    },
  }
}
