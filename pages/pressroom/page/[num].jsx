import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { services } from '../../../services'
import {
  getCanonical,
  getFQDN
} from '../../../src/helpers'
import { PressRoom } from '../../../src/views/PressRoom'

export async function getStaticPaths ({ locales }) {
  const data = await services.pressroom.getPaginatedData(null, 0)

  const pageNumbers = new Array(data.totalPages).fill(1).map((_, idx) => idx + 1)

  const paths = []

  locales.forEach(locale => {
    pageNumbers.forEach(pageNum => {
      paths.push({
        locale,
        params: {
          num: pageNum.toString()
        }
      })
    })
  })

  return {
    paths,
    fallback: false // can also be true or 'blocking'
  }
}

export async function getStaticProps ({ locale, params }) {
  const s = await serverSideTranslations(locale, ['common', 'press-room'])
  const data = await services.pressroom.getPaginatedData(null, parseInt(params.num - 1))

  return {
    props: {
      ...(s),
      news: await services.getNews(),
      posts: data.posts,
      totalPages: data.totalPages,
      page: parseInt(params.num - 1),
      videos: await services.getVideos(),
      pages: await services.getPages(),
      headerStyle: 'colored'
      // Will be passed to the page component as props
    }
  }
}

export default function PressPage (props) {
  const { t } = useTranslation('press-room')
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{t('META_TITLE')}</title>
        <meta name='description' content={t('META_DESCRIPTION')} />
        <link rel='canonical' href={getCanonical(router)} />
        <link rel='icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={t('META_OG_TITLE')} />
        <meta property='og:description' content={t('META_OG_DESCRIPTION')} />
        <meta property='og:image' content={getFQDN(t('META_OG_IMAGE'))} />
        <meta property='og:locale' content={router.locale} />
        <meta property='og:url' content={getCanonical(router)} />
        <meta property='twitter:site' content='@neptunemutual' />
        <meta property='twitter:creator' content='@neptunemutual' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:description' content={t('META_TWITTER_DESCRIPTION')} />
        <meta property='twitter:title' content={t('META_TWITTER_TITLE')} />
        <meta property='twitter:image' content={getFQDN(t('META_TWITTER_IMAGE'))} />
        <meta property='twitter:image:alt' content={t('META_TWITTER_IMAGE_ALT')} />

        {/* DO NOT INDEX */}
        <meta name='robots' content='noindex' />
      </Head>

      <main>
        <PressRoom
          news={props.news}
          pressRoomPosts={props.posts}
          pressRoomPostsTotal={props.totalPages}
          page={props.page}
        />
      </main>
    </>
  )
}
