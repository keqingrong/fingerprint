/**
 * @example
 * "(iPhone; CPU iPhone OS 14_7_1 like Mac OS X)" -> "iPhone; CPU iPhone OS 14_7_1 like Mac OS X"
 * "(KHTML, like Gecko)" -> "KHTML, like Gecko"
 */
export function removeParentheses(content: string) {
  return content.replace(/^\(/, '').replace(/\)$/, '')
}

/**
 * 解析 UA
 * TODO: 完整解析
 */
export function parseUA(userAgent: string) {
  // `\w` => [A-Za-z0-9_]
  const parenthesisRegex = /\([\w\s,;.\/\-]+\)/g
  const parenthesisList: string[] = []
  let parenthesisMatches: string[] | null = []
  while ((parenthesisMatches = parenthesisRegex.exec(userAgent)) !== null) {
    parenthesisList.push(parenthesisMatches[0])
  }
  const platformItem = removeParentheses(parenthesisList[0])
  const platformParsed = platformItem.split(';').map((item) => item.trim())
  const rest = userAgent.replace(parenthesisRegex, '')
  const regex = /([\w.]+\s?\w+)\/([\w.]+)+/g
  const groups: string[] = []
  let matches: string[] | null = []
  while ((matches = regex.exec(rest)) !== null) {
    groups.push(matches[0])
  }
  return {
    platform: platformParsed,
  }
}
