import { helpers } from '../helpers'
import { request } from '../http/request'
import { mockData } from '../_mock_'

let docs = null

const getDocs = async () => {
  if (docs) {
    return docs
  }

  console.log('fetching all programs')

  if (process.env.PROD === 'true') {
    const dataStr = await request.get(`${process.env.API_URL_PREFIX}programs?limit=1000`)
    const data = JSON.parse(dataStr)
    docs = data.docs
    return docs
  }

  docs = mockData.programs.docs
  return docs
}

const transformDoc = async (doc) => {
  const htmlContent = helpers.serialize(doc.content)
  const parsedHtml = await helpers.parseHtml(htmlContent)

  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    intro: doc.intro,
    category: doc.category,
    icon: doc.icon,
    content: {
      html: parsedHtml.updated,
      toc: parsedHtml.toc,
      minsToRead: parsedHtml.minsToRead
    },
    badges: JSON.parse(doc.badges || '[]'),
    meta: {
      title: doc.meta?.title || '',
      description: doc.meta?.description || '',
      image: {
        src: await helpers.storeOgImage(doc?.meta?.image?.filename),
        alt: helpers.getOgImageAlt(doc?.meta?.image?.alt)
      }
    }
  }
}

export const getPrograms = async () => {
  try {
    const docs = await getDocs()

    const result = await Promise.allSettled(docs.map(async (doc) => await transformDoc(doc)))

    return result.map(x => x.value)
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getSingleProgram = async (slug) => {
  try {
    const docs = await getDocs()

    const match = docs.find(doc => doc.slug === slug)

    return transformDoc(match)
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getProgramSlugs = async () => {
  try {
    const docs = await getDocs()

    const result = docs.map((doc) => doc.slug).filter(x => !!x)

    return result
  } catch (error) {
    console.error(error)
  }

  return []
}
