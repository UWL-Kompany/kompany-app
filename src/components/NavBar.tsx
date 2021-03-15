import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;
  //data is loading
  if (fetching) {
    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="beige" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="beige">Register</Link>
        </NextLink>
      </>
    );

    //user is logged in
  } else {
    body = (
      <Flex>
        <Box mr={2} color="beige">
          {data.me?.username}
        </Box>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant="link"
          color="beige"
        >
          {" "}
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="red.800" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};