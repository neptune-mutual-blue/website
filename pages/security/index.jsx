import Head from 'next/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { services } from '../../services'
import Link from 'next/link'

export async function getStaticProps ({ locale }) {
  const s = await serverSideTranslations(locale, ['common', 'security'])

  return {
    props: {
      ...(s),
      audits: await services.getAudits(),
      videos: await services.getVideos()
      // Will be passed to the page component as props
    }
  }
}

export default function SecurityPage (props) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>

        {props.audits.map(audit => {
          return <Link key={audit.id} href={`/security/${audit.slug}`}>{audit.title}</Link>
        })}

      </main>

      <footer />
    </>
  )
}
