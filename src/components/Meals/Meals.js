import React, { Fragment } from 'react'
import MealsSummary from './MealsSummary'
import AvailableFoods from './AvailableFood'

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableFoods />
    </Fragment>
  )
}

export default Meals
