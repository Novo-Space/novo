import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ColorModeButton } from "components/elements";
import { useRouter } from "next/router";
import { ReactNode, ReactText } from "react";
import { IconType } from "react-icons";
import { AiOutlineBank, AiOutlineSwap } from "react-icons/ai";
import { FaFaucet } from "react-icons/fa";
import { FiHome, FiMenu } from "react-icons/fi";
import { GiInjustice } from "react-icons/gi";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { ImEnter, ImExit } from "react-icons/im";
import { MdOutlineSavings } from "react-icons/md";
// import { useGlobalContext } from "../common/globalState";

// interface LinkItemProps {
//   name: string;
//   icon: IconType;
//   href: string;
// }
// const LinkItems: Array<LinkItemProps> = [
//   { name: 'Home', icon: FiHome, href: '/' },
//   { name: 'About', icon: FiTrendingUp, href: '/about' },
// ];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const generalNav: [string, string, IconType][] = [["Dashboard", "/", FiHome]];
  const defiNav: [string, string, IconType][] = [
    ["Swap", "/defi/swap", AiOutlineSwap],
    ["Yield", "/defi/yield", MdOutlineSavings],
    ["Borrow", "/defi/markets", AiOutlineBank],
    ["Faucet", "/defi/faucet", FaFaucet],
  ];
  const bridgeNav: [string, string, IconType][] = [
    ["Bridge In", "/bridge/bridge-in", ImEnter],
    ["Bridge Out", "/bridge/bridge-out", ImExit],
  ];

  const courtNav: [string, string, IconType][] = [
    ["Panel", "/admin/panel", GiInjustice],
    [
      "Open Reversal Request",
      "https://novaspace.discourse.group/t/about-the-reversal-requests-category-how-to-open-a-reversal-request/11",
      HiOutlineHandRaised,
    ],
    [
      "Latest Reversal Hearings",
      "https://novaspace.discourse.group/c/reversal-requests/5",
      GiInjustice,
    ],
  ];
  const navSections: [string, [string, string, IconType][]][] = [
    ["General", generalNav],
    ["Bridge", bridgeNav],
    ["Defi", defiNav],
    ["Court", courtNav],
  ];

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "260px" }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Novo OS
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {navSections.map(([sectionName, section]) => (
        <div key={sectionName}>
          <Text
            style={{
              margin: "30px 0 10px 30px",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {sectionName}
          </Text>
          {section.map(([name, route, e]) => (
            <NavItem key={name} icon={e} href={route}>
              {name}
            </NavItem>
          ))}
        </div>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactText;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  const router = useRouter();

  const isExternalLink = href.indexOf("https") != -1;
  // console.log(router.asPath);
  return (
    <Link
      href={href}
      isExternal={isExternalLink}
      style={{
        textDecoration: "none",
        fontWeight: router.asPath === href ? "bold" : "normal",
      }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          //   bg: "cyan.400",
          color: "cyan.400",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "cyan.400",
            }}
            as={icon}
          />
        )}
        <>
          {children}
          {isExternalLink && <ExternalLinkIcon mx="6px" />}
        </>
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const Header = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/* <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Novo OS
      </Text> */}

      <HStack gap={"10px"}>
        <ConnectButton />
        <ColorModeButton />
      </HStack>

      {/* <HStack spacing={{ base: '0', md: '6' }}>
        <ConnectButton />
      </HStack> */}
    </Flex>
  );
};
