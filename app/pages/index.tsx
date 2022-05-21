// @ts-nocheck
import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes, GetServerSideProps } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { Text, Flex, Box, Image, Button } from "@chakra-ui/react"
import Footer from "app/core/components/Footer"
import NavBar from "app/core/components/NavBar"

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
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-RapidAPI-Key": `${process.env.RAPID_KEY}`,
    },
  }
  const res = await fetch(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian&number=1",
    options
  )
  const recipe = await res.json()

  const newRecipe = recipe.recipes[0]

  return {
    props: {
      newRecipe,
    },
  }
}

const Home: BlitzPage = ({ newRecipe }) => {
  return (
    <Box w="100vw" borderWidth="4px" borderColor="whatsapp.300">
      <div className="container">
        <NavBar />
        <Image
          top="0"
          pos="absolute"
          zIndex="-1"
          w="100%"
          h="100%"
          fit="cover"
          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        />
        <Text
          rounded="md"
          p="2"
          bg="yellow.300"
          fontWeight="extrabold"
          mt="3"
          fontSize="4xl"
          fontStyle="italic"
        >
          Random Recipe
        </Text>
        <main>
          <Box
            // w={["2xl", "100%"]}
            // w="2xl"
            borderWidth="3px"
            borderColor="whatsapp.400"
            rounded="lg"
            boxShadow="2xl"
            mt="100px"
            bg="white"
          >
            <Text fontSize="3xl" fontWeight="bold" borderWidth="1px" p="2" m="2" bg="whatsapp.300">
              {newRecipe.title}
            </Text>
            <Image src={newRecipe.image} m="auto" w="100%"></Image>
            <Text fontSize="3xl" textDecoration="underline">
              Instructions
            </Text>
            <p>{newRecipe.instructions}</p>
            {/* <Text fontSize="3xl" textDecoration="underline" mt="3">
              Cook Time
            </Text>
            <p>Ready in {newRecipe.readyInMinutes} minutes</p> */}
            <Text fontSize="3xl" textDecoration="underline" mt="3">
              Ingredients
            </Text>
            <Text lineHeight="2">
              {newRecipe.extendedIngredients.map((ing) => (
                <Text key={ing.id}>{ing.original}</Text>
              ))}
            </Text>
          </Box>
          <Flex justify="center">
            <Button
              backgroundColor="yellow.400"
              m="4"
              transition="ease-in .2s"
              _hover={{ bg: "whatsapp.400", boxShadow: "2xl" }}
            >
              <Link href={Routes.Home()}>
                <a>Click To Get A Random Recipe</a>
              </Link>
            </Button>
          </Flex>
        </main>

        <Text bottom="0" textAlign="center" p="4" h="5%" w="100%" bg="whatsapp.300">
          COPYRIGHT &#169; Austin
        </Text>

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

          html,
          body {
            padding: 0;
            margin: 0;
            font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }

          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
          }
          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          main p {
            font-size: 1.2rem;
          }

          p {
            text-align: center;
          }

          footer {
            width: 100%;
            height: 60px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #45009d;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer a {
            color: #f4f4f4;
            text-decoration: none;
          }

          .logo {
            margin-bottom: 2rem;
          }

          .logo img {
            width: 300px;
          }

          .buttons {
            display: grid;
            grid-auto-flow: column;
            grid-gap: 0.5rem;
          }
          .button {
            font-size: 1rem;
            background-color: #6700eb;
            padding: 1rem 2rem;
            color: #f4f4f4;
            text-align: center;
          }

          .button.small {
            padding: 0.5rem 1rem;
          }

          .button:hover {
            background-color: #45009d;
          }

          .button-outline {
            border: 2px solid #6700eb;
            padding: 1rem 2rem;
            color: #6700eb;
            text-align: center;
          }

          .button-outline:hover {
            border-color: #45009d;
            color: #45009d;
          }

          pre {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            text-align: center;
          }
          code {
            font-size: 0.9rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
              Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            max-width: 800px;
            margin-top: 3rem;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </Box>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
