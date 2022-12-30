const fs = require('fs/promises')
const path = require('path')

const ensureDirectory = async (directory) => {
  try {
    await fs.access(directory)
  } catch {
    await fs.mkdir(directory, { recursive: true })
  }
}

const emptyDirectory = async (directory) => {
  try {
    await fs.rm(directory, { recursive: true })
  } catch {
    console.log('Can not delete directory: %s', directory)
  }

  await ensureDirectory(directory)
}

const ensureFile = async (file, content = '{}') => {
  try {
    await fs.access(file)
  } catch {
    await ensureDirectory(path.dirname(file))
    await fs.writeFile(file, content)
  }
}

const saveToDisk = async (filePath, contents) => {
  await fs.writeFile(filePath, JSON.stringify(contents, null, 2))
}

const saveToDiskRaw = async (filePath, contents) => {
  await fs.writeFile(filePath, contents)
}

const fetchValue = async (cache, key) => {
  if (!cache) {
    return ''
  }

  const { file, id } = cache
  const contents = await fs.readFile(file)
  const parsed = JSON.parse(contents)

  const node = parsed[id]

  if (node && node[key]) {
    return node[key]
  }

  return ''
}

const cacheValue = async (cache, key, value, deploymentInfo) => {
  if (!cache) {
    return
  }

  const { file, id } = cache
  const contents = await fs.readFile(file)
  const parsed = JSON.parse(contents)

  if (!Object.getOwnPropertyDescriptor(parsed, id)) {
    parsed[id] = {}
  }

  if (!parsed[id].deployments) {
    parsed[id].deployments = {}
  }

  parsed[id][key] = value
  parsed[id].deployments[key] = deploymentInfo

  await fs.writeFile(file, JSON.stringify(parsed, null, 2))
}

const readFile = async (filePath) => {
  const data = await fs.readFile(filePath)
  return data.toString()
}

const findFiles = async (extension, directoryName, results = []) => {
  const files = await fs.readdir(directoryName, { withFileTypes: true })

  for (const f of files) {
    const fullPath = path.join(directoryName, f.name)

    if (f.isDirectory()) {
      await findFiles(extension, fullPath, results)
    } else {
      if (fullPath.split('.').pop() === extension) {
        results.push(fullPath)
      }
    }
  }

  return results
}

const exists = async (filePath) => {
  try {
    await fs.access(filePath)
    return true
  } catch (error) {
    // console.error(error.message)
    // file not found
  }

  return false
}

module.exports = {
  cacheValue,
  emptyDirectory,
  ensureDirectory,
  ensureFile,
  exists,
  fetchValue,
  findFiles,
  readFile,
  saveToDisk,
  saveToDiskRaw
}
