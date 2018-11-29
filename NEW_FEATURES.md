# New Features TODO

* [ ] Pagination
  * Server
    * [x] v2 mews endpoint
    * [x] Skip and Limit from query params
      * [x] Defaults: skip - 0, limit - 10
      * [x] Include total count in response
    * [x] Order by created date
  * Client
    * [x] Skip and Limit variables
    * [x] Remove .reverse()
    * [x] Load More Button
      * [x] Hidden on page load
      * [x] Only show button if has_more is treu
      * [x] Get next page on button click
        * [x] Set skip
        * [x] Hide button
        * [x] Request mews
        * [x] Show button
* [ ] Search
  * Server
    * [ ] Add search param to /v2/mews query params
    * [ ] Update find options if search specified
  * Client
    * [ ] Add search input
    * [ ] Add search button
      * On click
        * [ ] Set search variable
        * [ ] List mews with search param
* [ ] Deploy!

# STRETCH

* [ ] Infinite scroll...