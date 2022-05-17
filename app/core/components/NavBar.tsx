// @ts-nocheck
import React from "react"
import { Heading, Text, Flex, Box, Image } from "@chakra-ui/react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
// import { useCurrentUser } from "app/core/hooks/useCurrentUser"

function NavBar() {
  return (
    <Flex
      fontStyle="italic"
      justify="center"
      backgroundColor="whatsapp.300"
      width="100vw"
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
    </Flex>
  )
}

export default NavBar
