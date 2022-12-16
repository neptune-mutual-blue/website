import { ConsentPopup } from '../ConsentPopup'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { GoogleAnalytics } from './GoogleAnalytics'

export const CookiesAndAnalytics = () => {
  const [accepted, setAccepted] = useLocalStorage('npm-cookies-accepted', undefined)
  const sawPopup = (typeof accepted !== 'undefined')

  return (
    <>
      <GoogleAnalytics accepted={accepted} />
      {!sawPopup && <ConsentPopup setAccepted={setAccepted} />}
    </>
  )
}
