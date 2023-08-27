import { WagmiProvider } from "../hooks/providers/WagmiProvider";
import Layout from "../layouts/Layout";
import { Balance } from "../modules/app/components/Balance";

export default function App() {
  return (
    <Layout>
      <WagmiProvider>
        <Balance />
      </WagmiProvider>
    </Layout>
  );
}
