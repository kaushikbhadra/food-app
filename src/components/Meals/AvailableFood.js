import React, { useState, useEffect } from 'react'

import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import styles from './AvailableFoods.module.css'

const AvailableFoods = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://food-order-app-5b294-default-rtdb.firebaseio.com/meals.json'
      )

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const data = await response.json()
      let loadMealData = []
      for (const key in data) {
        loadMealData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setMeals(loadMealData)
      setIsLoading(false)
    }

    fetchMeals().catch(function (error) {
      setIsLoading(false)
      setError(error.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.error}>
        <p>{error}</p>
      </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableFoods
