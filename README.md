# Meeting summaries app

- meeting data is being retrieved from Firebase
- UI was developed using Chakra UI
- the CRM data for each meeting is being synced with the Hubspot API through webhooks (APIs in NextJS provide an easy way to set up this implementation)

## Basic flow

- A user can view their meetings, create new meetings or edit meeting records
- by selecting multiple table rows, the user can delete multiple records

## Future improvements

- App state is currently being handled with Context API (handling chunks of state such as selected table rows, selected sorting options, active filters, etc). A future improvement could be the implementation of a state managment tool (more extensive research needed)
- When the data is mutated, the data fetch is being invalidated (through a custom implementation) - this solution is inefficient on large sets of data, and the implementation of an real-time update solution would be best
- The use of websockets integrated with the hubspot Webhook API
- Firestore pagination provides an easy way of breaking data up in chunks, however, not being able to get the total number of records limits the pagination functionality. Researching a better alternative for this would be a significant improvement

## Run the project locally

`git clone` & `yarn start`
