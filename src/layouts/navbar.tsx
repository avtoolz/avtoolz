import {
  Github,
  Heart,
  Logo,
  MenuToggle,
  NotifyBanner,
  ThemeToggle,
} from "@components";
import { useMediaQuery } from "@hooks/use-media-query";
import { GITHUB_REPO_URL } from "@lib/constants";
import { Route } from "@lib/tools/page";
import {
  Button,
  Col,
  Container,
  Link,
  Row,
  Spacer,
  useBodyScroll,
} from "@nextui-org/react";
import { Box } from "@primitives";
import { darkTheme } from "@theme/shared";
import { pulse } from "@utils/animations";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { StyledNavContainer, StyledNavMainContainer } from "./styles";

export interface Props {
  routes?: Route[];
  hasNotify?: boolean;
  isHome?: boolean;
}

const MobileNavigation = dynamic(
  () => import("../components/mobile-navigation"),
  {
    ssr: false,
  }
);

const Navbar: React.FC<Props> = ({ isHome, hasNotify, routes }) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery(960);
  const router = useRouter();
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });
  const [scrollPosition, setScrollPosition] = useState(0);

  const isDetached = hasNotify ? scrollPosition > 40 : scrollPosition > 0;

  useEffect(() => {
    setScrollPosition(
      (typeof window !== "undefined" && window.pageYOffset) || 0
    );
    window.addEventListener("scroll", onScroll.bind(this));

    return () => {
      window.removeEventListener("scroll", onScroll.bind(this));
    };
  }, []);

  const onScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.pageYOffset);
    });
  };

  useEffect(() => {
    if (!isMobile) {
      setExpanded(false);
      setBodyHidden(false);
    }
  }, [isMobile]);

  const onToggleNavigation = () => {
    setExpanded(!expanded);
    isMobile && setBodyHidden(!expanded);
  };

  const showBlur = !!expanded || !!isDetached || isHome;

  return (
    <StyledNavMainContainer id="navbar-container">
      {hasNotify && (
        <NotifyBanner
          href="/tools/components/navbar"
          isVisible={!isDetached}
          text="Navbar component"
        />
      )}
      <StyledNavContainer isDetached={isDetached} showBlur={showBlur}>
        <Container
          alignItems="center"
          as="nav"
          display="flex"
          lg={true}
          wrap="nowrap"
        >
          <Col
            className="navbar__logo-container"
            css={{
              "@mdMax": {
                width: "100%",
              },
            }}
          >
            <Row align="center" justify="flex-start">
              <NextLink href="/">
                <Link href="/">
                  <Logo
                    auto
                    className="navbar__logo"
                    css={{
                      cursor: "pointer",
                      transition: "$default",
                    }}
                  />
                </Link>
              </NextLink>
              {/* <Spacer x={0.4} />
              <Badge
                solid
                css={{
                  px: "$4",
                  "@mdMax": {
                    display: "none",
                  },
                }}
                type="secondary"
              >
                Beta
              </Badge> */}
            </Row>
          </Col>
          <Col
            className="navbar__resources-container"
            css={{ "@mdMax": { d: "none" } }}
          >
            <Row align="center" justify="center">
              {/* <Spacer x={1} y={0} />
              <NextLink href="/tools/guide/getting-started">
                <Link
                  className={cn("navbar__link", {
                    active:
                      isActive(router.pathname, "/tools/[[...slug]]") &&
                      !includes(router.asPath, "components"),
                  })}
                  css={{
                    color: "$text",
                    "&.active": {
                      fontWeight: "600",
                      color: "$primary",
                    },
                  }}
                  href="#"
                >
                  Docs
                </Link>
              </NextLink>
              <Spacer x={1} y={0} />
              <NextLink href="/tools/components/avatar">
                <Link
                  aria-disabled
                  className={cn("navbar__link", {
                    active: includes(router.asPath, "components"),
                  })}
                  css={{
                    color: "$text",
                    "&.active": {
                      fontWeight: "600",
                      color: "$primary",
                    },
                  }}
                  title="Components"
                >
                  Components
                </Link>
              </NextLink>
              <Spacer x={1} y={0} /> */}
              <Link
                className="navbar__link"
                css={{
                  color: "$text",
                }}
                href="https://github.com/a0v0/avtoolz/discussions/new?category=ideas"
                rel="noopener noreferrer"
                target="_blank"
                title="Request a tool to be added"
              >
                Feature Request
              </Link>
            </Row>
          </Col>
          <Col className="navbar__search-container">
            <Row
              align="center"
              className="navbar__search-row"
              css={{
                position: "initial",
                "@mdMax": {
                  jc: "center",
                },
              }}
              justify="flex-end"
            >
              <Row
                align="center"
                className="navbar__social-icons-container"
                css={{
                  width: "initial",
                  "@mdMax": {
                    d: "none",
                  },
                }}
                gap={1}
                justify="flex-end"
              >
                <Link
                  className="navbar__social-icon"
                  css={{
                    m: "0 6px",
                    "& svg": {
                      transition: "$default",
                    },
                    "&:hover": {
                      "& svg": {
                        opacity: 0.7,
                      },
                    },
                  }}
                  href={GITHUB_REPO_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Github size={24} />
                </Link>
                <ThemeToggle
                  className="navbar__social-icon"
                  css={{
                    m: "0 6px",
                    "& svg": {
                      transition: "$default",
                    },
                    "&:hover": {
                      "& svg": {
                        opacity: 0.7,
                      },
                    },
                  }}
                />
              </Row>

              <Spacer x={0.5} />
              <Button
                auto
                as="a"
                css={{
                  bg: "$gray50",
                  color: "$text",
                  maxH: "38px",
                  px: "$8",
                  "@mdMax": {
                    d: "none",
                  },
                  "& .nextui-button-icon": {
                    mr: "$2",
                  },
                  "& .nextui-button-icon svg": {
                    transition: "$default",
                  },
                  "&:hover": {
                    "& .nextui-button-icon svg": {
                      animation: `${pulse} 1s infinite`,
                    },
                  },
                  [`.${darkTheme} &`]: {
                    bg: "rgba(51, 51,51,0.7)",
                    "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))":
                      {
                        bf: "saturate(180%) blur(14px)",
                      },
                  },
                }}
                href={GITHUB_REPO_URL}
                icon={
                  <Heart filled fill="var(--nextui-colors-red600)" size={20} />
                }
                rel="noreferrer"
                target="_blank"
              >
                Sponsor
              </Button>
            </Row>
          </Col>
          <Col
            className="navbar__menu-container"
            css={{
              size: "100%",
              display: "none",
              "@mdMax": {
                display: "flex",
                justifyContent: "flex-end",
              },
            }}
          >
            <ThemeToggle
              className="navbar__social-icon-mobile"
              css={{ m: "0" }}
            />
            <Box
              className="navbar__menu-arrow noselect"
              css={{
                height: "100%",
                minHeight: "40px",
                minWidth: "30px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              onClick={onToggleNavigation}
            >
              <MenuToggle expanded={expanded} />
            </Box>
          </Col>
          <MobileNavigation
            detached={isDetached}
            hasNotify={hasNotify}
            opened={expanded}
            routes={routes}
            onClose={() => {
              setExpanded(false);
              setBodyHidden(false);
            }}
          />
        </Container>
      </StyledNavContainer>
    </StyledNavMainContainer>
  );
};

export default Navbar;
