import { Container } from '@chakra-ui/react';
import {  SidebarWithHeader} from 'components/modules';
import Head from 'next/head';
import { FC, ReactNode } from 'react';

const Default: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => (
  <>
    <Head>
      <title>{`${pageName} | Novo OS`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {/* <Header /> */}
    <SidebarWithHeader>
    <Container maxW="container.lg" p={3} marginTop={100} as="main" minH="70vh">
      {children}
    </Container>
</SidebarWithHeader>
    {/* <Footer /> */}
  </>
);

export default Default;
