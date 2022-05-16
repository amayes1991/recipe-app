// @ts-nocheck
import React, { useState, useEffect } from "react"
import { Text, Flex, Box, Image, Button } from "@chakra-ui/react"
import NavBar from "app/core/components/NavBar"
import { SearchIcon } from "@chakra-ui/icons"
import { BlitzPage } from "blitz"
import { z } from "zod"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const key = process.env.MEAL_KEY

  return {
    props: {},
  }
}

const Meal: BlitzPage = () => {
  const [diet, setDiet] = useState("")
  const [endpoint, setEndpoint] = useState("salad")
  const [page, setPage] = useState(null)
  const [meal, setMeal] = useState([])
  const [count, setCount] = useState(1)

  const handlediet = (e) => {
    const entry = e.target.value
    setDiet(entry)
  }
  const handleOnSubmitSearch = (e) => {
    e.preventDefault()

    const { currentTarget = {} } = e
    const fields = Array.from(currentTarget?.elements)
    const fieldQuery = fields.find((field) => field.name === "q")

    const value = fieldQuery.value || ""
    const result = `https://edamam-recipe-search.p.rapidapi.com/search?q=${value}`

    setEndpoint(value)

    setPage(result)
  }

  useEffect(() => {
    const request = async () => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "themealdb.p.rapidapi.com",
          "X-RapidAPI-Key": `a8109881damshb34a86560438612p133d27jsn866649516d23`,
        },
      }
      const res = await fetch(`https://themealdb.p.rapidapi.com/search.php?s=${endpoint}`, options)
      const data = await res.json()

      let meal = data.meals
      console.log(data.meals)
      setMeal(meal)
    }
    request()
  }, [page])

  console.log(meal)

  return (
    <div>
      <NavBar />
      <Flex justify="center">
        <Text
          bg="whatsapp.400"
          w="50%"
          rounded="full"
          mt="9"
          textAlign="center"
          fontWeight="bold"
          fontSize="3xl"
        >
          Meal Search
        </Text>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mt="10">
        <form action="" onSubmit={handleOnSubmitSearch}>
          <Flex flexDirection="column">
            <Text>
              <Text
                borderWidth="2px"
                rounded="full"
                outline="none"
                p="2"
                as="input"
                type="search"
                placeholder="ex. salad"
                name="q"
                value={diet}
                onChange={handlediet}
              />
            </Text>
            <Button
              backgroundColor="yellow.400"
              transition="ease-in .2s"
              _hover={{ bg: "whatsapp.400", boxShadow: "2xl" }}
              mt="5"
              rounded="full"
              as="button"
              type="submit"
            >
              <SearchIcon mr="2" />
              Search{" "}
            </Button>
          </Flex>
        </form>
      </Flex>

      {endpoint === null ? null : (
        <div>
          {meal.map((m) => (
            <Flex key={m.idMeal} justify="center" alignItems="center">
              <Box w="2xl" m="5" bg="whatsapp.300" boxShadow="2xl" rounded="md">
                <Text textAlign="center" fontSize="3xl" fontWeight="bold" key={m.idMeal}>
                  {m.strMeal}
                </Text>
                <Flex flexDirection="column">
                  <Image key={m.idMeal} src={m.strMealThumb} alt="recipe" />
                  <div>
                    <Text
                      textAlign="center"
                      m="6"
                      fontSize="2xl"
                      fontWeight="bold"
                      textDecoration="underline"
                    >
                      Instructions
                    </Text>
                    <Text m="9">{m.strInstructions}</Text>
                    <Text></Text>
                    {/* <Text textAlign="center" fontSize="xl">
                      Ready in {m.recipe.totalTime} minutes
                    </Text> */}
                    {/* <Text
                      textAlign="center"
                      m="6"
                      fontSize="2xl"
                      fontWeight="bold"
                      textDecoration="underline"
                      key={m.recipe.ingredientLines.id}
                    >
                      Ingredients
                    </Text>
                    {m.recipe.ingredientLines.map((ing) => (
                      <Text key={ing.id} textAlign="center" ml="8" mb="2">
                        {ing}
                      </Text>
                    ))} */}
                  </div>
                </Flex>
              </Box>
            </Flex>
          ))}
        </div>
      )}
    </div>
  )
}

export default Meal
