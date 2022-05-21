// @ts-nocheck
import { Suspense, useRef } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecipes from "app/recipes/queries/getRecipes"
import { Heading, Text, Flex, Box, Image, Button } from "@chakra-ui/react"
import Footer from "app/core/components/Footer"
import NavBar from "app/core/components/NavBar"

const ITEMS_PER_PAGE = 100

export const RecipesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ recipes, hasMore }] = usePaginatedQuery(getRecipes, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <Flex justifyContent="center" alignItems="center">
            <Link href={Routes.ShowRecipePage({ recipeId: recipe.id })}>
              <Box
                _hover={{ bg: "yellow.400", boxShadow: "2xl" }}
                transition="ease-in .2s"
                cursor="pointer"
                boxShadow="xl"
                p="0"
                rounded="md"
                bg="whatsapp.300"
                m="10"
                flexBasis={["auto", "50%"]}
              >
                <Text fontSize="2xl" fontWeight="bold" fontStyle="italic" textAlign="center">
                  {recipe.title}
                </Text>
                <Image w="100%" src={recipe.image} />
              </Box>
            </Link>
          </Flex>
        </div>
      ))}
    </div>
  )
}

const RecipesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>

      <NavBar />
      <Box h="80vh">
        <Flex justify="center" align="center">
          <Text
            rounded="md"
            p="2"
            bg="whatsapp.400"
            pos="absolute"
            color="white"
            textAlign="center"
            fontSize="7xl"
          >
            Recipe Book
          </Text>
          <Image
            h="5%"
            w="100%"
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          />
        </Flex>
        <Box bgImage="url('')" h="100%">
          <Box borderWidth="9px" w="100%" m="auto" borderColor="whatsapp.400" boxShadow="2xl">
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              {/* <Text fontSize="xl" m="2"></Text> */}

              <Suspense fallback={<div>Loading...</div>}>
                <RecipesList />
              </Suspense>
            </Flex>
          </Box>
          <Flex justify="center" alignItems="center" mt="6">
            <Button
              backgroundColor="yellow.400"
              m="5"
              _hover={{ bg: "whatsapp.400", boxShadow: "2xl" }}
            >
              <Link href={Routes.NewRecipePage()}>
                <a>Create Recipe</a>
              </Link>
            </Button>
            <Button
              backgroundColor="yellow.400"
              transition="ease-in .2s"
              _hover={{ bg: "whatsapp.400", boxShadow: "2xl" }}
            >
              <Link href={Routes.Home()}>
                <a>Click for Random Meal</a>
              </Link>
            </Button>
          </Flex>
        </Box>
      </Box>

      <Text position="sticky" bottom="0" textAlign="center" p="4" h="5%" w="100%" bg="whatsapp.300">
        COPYRIGHT &#169; Austin
      </Text>
    </>
  )
}

RecipesPage.authenticate = true
RecipesPage.getLayout = (page) => <Layout>{page}</Layout>

export default RecipesPage
