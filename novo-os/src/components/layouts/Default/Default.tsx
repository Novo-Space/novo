import { SidebarWithHeader } from "components/modules";
import { FC, ReactNode } from "react";

const Default: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    {/* <Head>
      <title>{`${pageName} | Novo OS`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head> */}
    <SidebarWithHeader>{children}</SidebarWithHeader>
  </>
);

export default Default;
