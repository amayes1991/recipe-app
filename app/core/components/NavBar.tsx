// @ts-nocheck
import React from "react"
import { Heading, Text, Flex, Box, Image } from "@chakra-ui/react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        {/* <Link href={Routes.SignupPage()}>
        <a className="button small">
          <strong>Sign Up</strong>
        </a>
      </Link> */}
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

function NavBar() {
  return (
    <Flex
      fontStyle="italic"
      justify="center"
      backgroundColor="whatsapp.300"
      width="100%"
      p="2"
      boxShadow="xl"
    >
      <Link href={Routes.Home()}>
        <Text fontWeight="bold" _hover={{ cursor: "pointer", color: "yellow.400" }} m="2">
          Home
        </Text>
      </Link>
      <Link href={Routes.NewRecipePage()}>
        <Text fontWeight="bold" _hover={{ cursor: "pointer", color: "yellow.400" }} m="2">
          Create Recipe
        </Text>
      </Link>
      <Link href={Routes.RecipesPage()}>
        <Text fontWeight="bold" _hover={{ cursor: "pointer", color: "yellow.400" }} m="2">
          Recipe Book
        </Text>
      </Link>
      <Link href={Routes.Meal()}>
        <Text fontWeight="bold" _hover={{ cursor: "pointer", color: "yellow.400" }} m="2">
          Meal Search
        </Text>
      </Link>
      <UserInfo />
    </Flex>
  )
}

export default NavBar
