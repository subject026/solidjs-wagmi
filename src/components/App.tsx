import { SafeProvider } from "../hooks/providers/SafeProvider";
import { WagmiProvider } from "../hooks/providers/WagmiProvider";

import Layout from "../layouts/Layout";
import { Account } from "../modules/app/components/Account";
import { AppInterface } from "../modules/app/components/AppInterface";

export default function App() {
  console.log("app!");
  return (
    <WagmiProvider>
      <Layout>
        {/* <SafeProvider> */}
        <AppInterface />
        {/* </SafeProvider> */}
      </Layout>
    </WagmiProvider>
  );
}
