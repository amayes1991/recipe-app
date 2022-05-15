// @ts-nocheck
import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecipe from "app/recipes/queries/getRecipe"
import deleteRecipe from "app/recipes/mutations/deleteRecipe"
import { Heading, Text, Flex, Box, Image, Button } from "@chakra-ui/react"
import { PhoneIcon, AddIcon, WarningIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import NavBar from "app/core/components/NavBar"
import Footer from "app/core/components/Footer"

export const Recipe = () => {
  const router = useRouter()
  const recipeId = useParam("recipeId", "number")
  const [deleteRecipeMutation] = useMutation(deleteRecipe)
  const [recipe] = useQuery(getRecipe, { id: recipeId })
  const [input, setInput] = useState("")

  const handleInput = (e) => {
    const value = e.target.value
    setInput(value)
  }

  return (
    <>
      <Head>
        <title>Recipe {recipe.id}</title>
      </Head>
      <NavBar />
      <div>
        <Box boxShadow="2xl" w="3xl" mt="16" mb="3" bg="whatsapp.300">
          <Text textAlign="center" as="h1" fontSize="4xl" fontWeight="bold">
            {recipe.title} Recipe{" "}
          </Text>

          <Image w="100%" src={recipe.image} />
          <Text textAlign="center">
            <Text fontSize="2xl" textDecoration="underline">
              Instructions
            </Text>
            <p>{recipe.instructions}</p>
            <Text fontSize="2xl" textDecoration="underline">
              Ingredients
            </Text>
            <ul>
              <p>{recipe.ingredients1}</p>
              <p>{recipe.ingredients2}</p>
              <p>{recipe.ingredients3}</p>
              <p>{recipe.ingredients4}</p>
              <p>{recipe.ingredients5}</p>
              <p>{recipe.ingredients6}</p>
            </ul>
          </Text>

          <Button
            _hover={{ bg: "yellow.100" }}
            m="2"
            bg="yellow.300"
            rounded="full"
            transition="ease-in .2s"
          >
            <Link href={Routes.EditRecipePage({ recipeId: recipe.id })}>
              <a>
                <EditIcon />
              </a>
            </Link>
          </Button>

          <button
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteRecipeMutation({ id: recipe.id })
                router.push(Routes.RecipesPage())
              }
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            <Button _hover={{ bg: "yellow.100" }} m="2" bg="yellow.300" rounded="full">
              <DeleteIcon />
            </Button>
          </button>
        </Box>
      </div>

      <Footer />
    </>
  )
}

const ShowRecipePage: BlitzPage = () => {
  return (
    <Flex flexDirection="column" justify="center" alignItems="center">
      <p></p>

      <Suspense fallback={<div>Loading...</div>}>
        <Recipe />
      </Suspense>
      <Button
        bg="yellow.300"
        borderWidth="1px"
        rounded="lg"
        p="2"
        _hover={{ bg: "whatsapp.400", boxShadow: "2xl" }}
      >
        <Link href={Routes.RecipesPage()}>
          <a>Back to All Recipes</a>
        </Link>
      </Button>
    </Flex>
  )
}

ShowRecipePage.authenticate = true
ShowRecipePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRecipePage
