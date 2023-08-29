import { SafeProvider } from "../hooks/providers/SafeProvider";
import { WagmiProvider } from "../hooks/providers/WagmiProvider";
import Layout from "../layouts/Layout";
import { Account } from "../modules/app/components/Account";

export default function App() {
  return (
    <Layout>
      <WagmiProvider>
        {/* <SafeProvider> */}
        <Account />
        {/* </SafeProvider> */}
      </WagmiProvider>
    </Layout>
  );
}
