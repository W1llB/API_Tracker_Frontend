## Version 2.0 Plan

### Frontend Changes:

- Improve list mechanics/ rendering - avoid bug that collapsible content resets on each fetch request

  - Move JSON preview to a side view or separate status content from JSON preview
  - Look into how to preserve some state during re-render - e.g. collapsed or not

- Implement API list search by:

  - Title
  - Tag
  - Status - e.g. exclude 404 APIs

- Implement user specific lists - avoid login/ authentication by using local cache identification?

  - Unique user lists on the backend accessed by token from front end

- Move API status fetches to front end to reduce demand on backend sending across saved JSON output?

- Footer with links

- Dark mode toggle

- More user instructions/ context

### Backend Updates:

- Convert to Java/ springboot?

- Adapt database structure to store unique user lists

  - Save their inputted API endpoints, API names, API tags with unique token
  - SQL or document based - MongoDB??

- Remove fetching funtionality
