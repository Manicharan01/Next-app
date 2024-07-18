import Appbar from '../components/Appbar';
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
    return <RecoilRoot>
        <Appbar />
        <Component {...pageProps} />
    </RecoilRoot>;
}
