// import '@/styles/globals.css';
// import { WalletProvider } from '@/context/WalletContext';
// import WalletHeader from '@/components/Header';
// import type { AppProps } from 'next/app';

// function App({ Component, pageProps }: AppProps) {
//   return (
//     <div>
//       <WalletProvider>
//         <WalletHeader/>
//         <Component {...pageProps} />
//       </WalletProvider>
//     </div>
//   );
// }

// export default App;

import "@/styles/globals.css";
import { WalletProvider } from '@/context/WalletContext';
import WalletHeader from '@/components/Header';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <WalletHeader/>
       <Component {...pageProps} />
    </WalletProvider>
  )
}
